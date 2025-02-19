from loguru import logger
from chatbot.graph.graph import LangGraphManager
from langchain_core.messages import ToolMessage
import uuid
import sys

# logger.add(sys.stderr,
#            level="INFO",
#            format="{time} | {level} \n{message}")
# keep logs for 7 days, creating new log every hour
logger.add("./logs/main.log",
           rotation="1 day",
           retention="7 days"
           )


def _print_event(event: dict, _printed: set, max_length=10000):
    current_state = event.get("dialog_state")
    if current_state:
        logger.info("Currently in: ", current_state[-1])
    message = event.get("messages")
    if message:
        if isinstance(message, list):
            message = message[-1]
        if message.id not in _printed:
            msg_repr = message.pretty_repr(html=True)
            if len(msg_repr) > max_length:
                msg_repr = msg_repr[:max_length] + " ... (truncated)"
            logger.info(msg_repr)
            _printed.add(message.id)


if __name__ == "__main__":
    mgr = LangGraphManager()
    # mgr.save_graph(location='graph.png')

    # create unique chat id (passenger_id to help retrieve client info)
    config = {
        "configurable": {
            "user_id": mgr.id,
            "thread_id": str(uuid.uuid4()),
        }
    }
    # hold a set of responses
    _printed = set()
    keep_asking = True

    while keep_asking:
        question = input("[press q to exit] > ")
        if question == "q":
            keep_asking = False
            break

        # run the graph with user questions
        events = mgr.graph.stream({"messages": ("user", question)}, config, stream_mode="values")

        this_event = None
        for event in events:
            this_event = event
            _print_event(this_event, _printed)
        snapshot = mgr.graph.get_state(config)

        while snapshot.next:
            # We have an interrupt! The agent is trying to use a tool, and the user can approve or deny it
            # Note: This code is all outside of your graph. Typically, you would stream the output to a UI.
            # Then, you would have the frontend trigger a new run via an API call when the user has provided input.
            user_input = input("Do you approve of the above actions? Type 'y' to continue OR 'detailed instructions': ")
            if user_input.strip() == "y":
                # Just continue
                result = mgr.graph.invoke(None, config)
                logger.debug(result)

            else:
                # Satisfy the tool invocation by providing instructions on the requested changes / change of mind
                result = mgr.graph.invoke(
                    {
                        "messages": [
                            ToolMessage(
                                tool_call_id=this_event["messages"][-1].tool_calls[0]["id"],
                                content=f"API call denied by user. Reasoning: '{user_input}'. Continue assisting, accounting for the user's input.",
                            )
                        ]
                    },
                    config,
                )
            snapshot = mgr.graph.get_state(config)
    logger.info("Done")
    del mgr