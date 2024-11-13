from langchain_core.pydantic_v1 import BaseModel, Field
from langchain_core.prompts import ChatPromptTemplate
from chatbot.tools.llm import LLM
from datetime import datetime
from langchain_community.tools.tavily_search import TavilySearchResults

from chatbot.tools.SearchService import SearchService


# Primary Assistant
class ToEventBookingAssistant(BaseModel):
    """Transfers work to a specialized assistant to handle updates and cancellations to their events."""
    __name__ = 'ToEventBookingAssistant'
    request: str = Field(
        description="Any necessary follow up questions the update flight assistant should clarify before proceeding."
    )


primary_assistant_prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "You are a helpful customer support assistant for an activity application. "
            "Your primary role is to search for event information and company policies to answer customer queries. "
            "If a customer requests to modify the events that they are attending in any way, "
            "delegate the task to the appropriate specialized assistant by invoking the corresponding tool. "
            "You are not able to make these types of changes yourself. "
            "Only the specialized assistants are given permission to do this for the user. "
            "The user is not aware of the different specialized assistants, so do not mention them; just quietly delegate through function calls. "
            "Provide detailed information to the customer, and always double-check the database before concluding that information is unavailable. "
            "When searching, be persistent. Expand your query bounds if the first search returns no results. "
            "If a search comes up empty, expand your search before giving up."
            "\n\nCurrent user event information:\n<Events>\n{user_id}\n</Events>"
            "\nCurrent time: {time}.",
        ),
        ("placeholder", "{messages}"),
    ]
).partial(time=datetime.now)

s = SearchService()

primary_assistant_tools = [
    TavilySearchResults(max_results=1),
    s.search_event,
    # ToEventBookingAssistant
]

primary_assistant_runnable = primary_assistant_prompt | LLM.bind_tools(
    primary_assistant_tools
    + [
        ToEventBookingAssistant,
    ]
)
