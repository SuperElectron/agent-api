from typing import Optional, Annotated
from typing_extensions import TypedDict
from langgraph.graph.message import add_messages, AnyMessage


def update_dialogue_stack(left: list[str], right: Optional[str]) -> list[str]:
    """Push or pop the state"""

    if right is None:  # do not touch of right is None
        return left
    if right == "pop":  # remove the last element of the str list [left]
        return left[:-1]

    return left + [right]  # if right is not None and is not pop, extend the list


class State(TypedDict):
    messages: Annotated[list[AnyMessage], add_messages]
    user_id: str
    dialog_state: Annotated[
        # dialog_state = is a list: represents the current state of the dialog
        list[str],
        update_dialogue_stack,
    ]


"""
Example:
Imagine a user interacting with the chatbot:

The initial dialog_state might be ["assistant"].
The user asks to update their event, so "update_event" is added to the dialog_state:
The stack becomes ["assistant", "update_event"].
The user then decides to pay for the event, so "pay_event" is added:
The stack becomes ["assistant", "update_event", "pay_event"].
If the user completes the hotel booking, the system might pop "pay_event" off the stack:
The stack returns to ["assistant", "update_event"].
"""
