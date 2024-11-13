from langchain_core.pydantic_v1 import BaseModel
from typing import Callable
from langchain_core.messages import ToolMessage
from chatbot.graph.state import State


class CompleteOrEscalate(BaseModel):
    """A tool to mark the current task as completed and/or to escalate control of the dialog to the main assistant,
    who can re-route the dialog based on the user's needs."""

    cancel: bool = True
    reason: str

    class Config:
        schema_extra = {
            "example": {
                "cancel": True,
                "reason": "User changed their mind about the current task.",
            },
            "example 2": {
                "cancel": True,
                "reason": "I have fully completed the task.",
            },
            "example 3": {
                "cancel": False,
                "reason": "I need to search the user's emails or calendar for more information.",
            },
        }


# Create a function to make an "entry" node for each workflow, stating "the current assistant ix assistant_name".
def create_entry_node(assistant_name: str, new_dialog_state: str) -> Callable:
    def entry_node(state: State) -> dict:
        tool_call_id = state["messages"][-1].tool_calls[0]["id"]
        return {
            "messages": [
                ToolMessage(
                    content=f"The assistant is now the {assistant_name}. Reflect on the above conversation between the host assistant and the user. "
                    f"The user's intent is unsatisfied. Use the provided tools to assist the user. Remember, you are {assistant_name}, "
                    "and the booking, update, other other action is not complete until after you have successfully invoked the appropriate tool. "
                    "If the user changes their mind or needs help for other tasks, call the CompleteOrEscalate function to let the primary host assistant take control. "
                    "Do not mention who you are - just act as the proxy for the assistant. ",
                    tool_call_id=tool_call_id,
                )
            ],
            "dialog_state": new_dialog_state,
        }

    return entry_node
