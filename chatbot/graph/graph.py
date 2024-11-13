from loguru import logger
from os import chmod
from typing import Literal, List
from langchain_core.runnables import Runnable
from langchain_core.messages import ToolMessage
from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import StateGraph, START, END
from langgraph.prebuilt import tools_condition
from langgraph.prebuilt import ToolNode
from langchain_core.runnables import RunnableLambda
from chatbot.tools.SearchService import SearchService
from chatbot.graph.state import State
from chatbot.agents.agents_utilities import (
    create_entry_node,
    CompleteOrEscalate,
)
from chatbot.agents.assistant_wrapper import Assistant
from chatbot.agents.specialized_assistants import (
    event_booking_runnable,
)
from chatbot.agents.primary_assistant import (
    primary_assistant_runnable,
    primary_assistant_tools,
    ToEventBookingAssistant,
)


class LangGraphManager:
    def __init__(self):
        self.builder = StateGraph(State)
        self.memory = MemorySaver()
        self.search_service = SearchService()
        self.graph = None
        self.build_graph()
        self.id = self.search_service.get_id()

    def handle_tool_error(self, state) -> dict:
        error = state.get("error")
        tool_calls = state["messages"][-1].tool_calls
        return {
            "messages": [
                ToolMessage(
                    content=f"Error: {repr(error)}\n please fix your mistakes.",
                    tool_call_id=tc["id"],
                )
                for tc in tool_calls
            ]
        }

    def create_tool_node_with_fallback(self, tools: list) -> dict:
        return ToolNode(tools).with_fallbacks(
            [RunnableLambda(self.handle_tool_error)], exception_key="error"
        )

    def user_id(self, state: State):
        u_info = self.search_service.fetch_user_information()
        return {"user_id": u_info}

    def add_fetch_user_info_node(self):
        self.builder.add_node("fetch_user_id", RunnableLambda(self.user_id))
        self.builder.add_edge(START, "fetch_user_id")

    def graph_add_specialized_workflows(
            self,
            dialog_state: str,
            assistant_name: str,
            assistant_runnable: Runnable,
            safe_tools: list,
            sensitive_tools: list,
    ):
        # Assistant entry node
        self.builder.add_node(
            node=f"enter_{dialog_state}",
            action=create_entry_node(assistant_name=assistant_name, new_dialog_state=dialog_state),
        )
        # Assistant node
        self.builder.add_node(node=dialog_state, action=Assistant(assistant_runnable))
        self.builder.add_edge(start_key=f"enter_{dialog_state}", end_key=dialog_state)

        # Safe tools node
        self.builder.add_node(
            node=f"{dialog_state}_safe_tools",
            action=self.create_tool_node_with_fallback(safe_tools),
        )
        # Sensitive tools node
        self.builder.add_node(
            node=f"{dialog_state}_sensitive_tools",
            action=self.create_tool_node_with_fallback(sensitive_tools),
        )

        # Add edges
        self.builder.add_edge(f"{dialog_state}_safe_tools", dialog_state)
        self.builder.add_edge(f"{dialog_state}_sensitive_tools", dialog_state)

        # Add conditional edge
        def route_update_workflow(state: State) -> str:
            route = tools_condition(state)
            if route == END:
                return END

            tool_calls = state["messages"][-1].tool_calls
            did_cancel = any(tc["name"] == CompleteOrEscalate.__name__ for tc in tool_calls)
            if did_cancel:
                return "leave_skill"

            safe_toolnames = [t.__name__ for t in safe_tools]
            if all(tc["name"] in safe_toolnames for tc in tool_calls):
                return f"{dialog_state}_safe_tools"

            return f"{dialog_state}_sensitive_tools"

        self.builder.add_conditional_edges(
            dialog_state,
            route_update_workflow,
        )

    def pop_dialog_state(self, state: State) -> dict:
        messages = []
        if state["messages"][-1].tool_calls:
            messages.append(
                ToolMessage(
                    content="Resuming dialog with the host assistant. Please reflect on the past conversation and assist the user as needed.",
                    tool_call_id=state["messages"][-1].tool_calls[0]["id"],
                )
            )
        return {
            "dialog_state": "pop",
            "messages": messages,
        }

    def add_leave_skill_node(self):
        self.builder.add_node("leave_skill", self.pop_dialog_state)
        self.builder.add_edge("leave_skill", "primary_assistant")

    def route_primary_assistant(self, state: State) -> Literal[
        "primary_assistant_tools",
        "enter_update_event",
        "__end__",
    ]:
        # TODO: modify so that I dont have to explicitly tell which string i will return
        route = tools_condition(state)
        if route == END:
            return END
        tool_calls = state["messages"][-1].tool_calls
        if tool_calls:
            # if tool_calls[0]["name"] in self._assistant_names: return tool_calls[0]['name']
            logger.info(f"TOOL CALL: {tool_calls[0]['name']}")

            if tool_calls[0]["name"] == ToEventBookingAssistant.__name__:
                return "enter_update_event"
            return "primary_assistant_tools"
        raise ValueError("Invalid route")

    def add_primary_assistant_nodes(self):
        self.builder.add_node("primary_assistant", Assistant(primary_assistant_runnable))
        self.builder.add_node(
            "primary_assistant_tools", self.create_tool_node_with_fallback(primary_assistant_tools)
        )
        self.builder.add_conditional_edges(
            "primary_assistant",
            self.route_primary_assistant,
            {
                "enter_update_event": "enter_update_event",
                "primary_assistant_tools": "primary_assistant_tools",
                END: END,
            },
        )
        self.builder.add_edge("primary_assistant_tools", "primary_assistant")

    def route_to_workflow(self, state: State) -> str:
        # TODO: dont explicitly return Literals like this
        dialog_state = state.get("dialog_state")
        if not dialog_state:
            logger.info("Routing to 'primary_assistant' ")
            return "primary_assistant"
        logger.debug(f"Routing to '{dialog_state[-1]}' ")
        return dialog_state[-1]

    def finalize_graph(self, stop_before_list: List[str]):
        self.builder.add_conditional_edges("fetch_user_id", self.route_to_workflow)
        self.graph = self.builder.compile(
            checkpointer=self.memory,
            interrupt_before=stop_before_list
        )

    def build_graph(self):
        self.add_fetch_user_info_node()
        # NOTE: we need to keep track of specialized workflows because they are used to modify (e.g. book event)
        # we keep track of the dialog, like update_event, and create a list of the sensitive_tools
        # example: _event = ["update_event", "update_hosting"] --> ["update_event_sensitive_tools", "update_hosting_sensitive_tools"]
        ## interrupt_before_list = [item + "_sensitive_tools" for item in _event]
        # _assistants = [
        #     {"assistant": "update_event",
        #     "description": "Event Modification Assistant",
        #     "runnable": event_booking_runnable,
        #     "cls": self.search_service
        #     },
        #     {...},
        # ]
        # _before_list = [item['assistant'] + "_sensitive_tools" for item in _assistants]

        _assistants = ["update_event"]
        self.graph_add_specialized_workflows(
            dialog_state=_assistants[0],
            assistant_name="Event Modification Assistant",
            assistant_runnable=event_booking_runnable,
            safe_tools=self.search_service.get_safe_tools(),
            sensitive_tools=self.search_service.get_sensitive_tools(),
        )
        _before_list = [item + "_sensitive_tools" for item in _assistants]

        self.add_leave_skill_node()
        self.add_primary_assistant_nodes()
        self.finalize_graph(stop_before_list=_before_list)
        return self.graph

    def save_graph(self, location:str):
        assert location is not None, "Must provide path to save the file"

        try:
            img = self.graph.get_graph(xray=True).draw_png()
            with open(location, "wb") as f:
                f.write(img)
            chmod(location, 0o777)
            logger.info(f'saved graph to {location}')
        except Exception as err:
            logger.error(f"Error caught while saving the graph (location={location}): {err}")
