from datetime import datetime
from langchain_core.prompts import ChatPromptTemplate
from chatbot.tools.llm import LLM
from chatbot.agents.agents_utilities import CompleteOrEscalate
from chatbot.tools.SearchService import SearchService


# a function for compose a runnable to be passed into the wrapper Assistant
def create_runnable(safe_tools, sensitive_tools, prompt):
    tools = safe_tools + sensitive_tools
    runnable = prompt | LLM.bind_tools(tools + [CompleteOrEscalate])
    return runnable


event_service = SearchService()

# Event booking assistant  ######################################################
event_booking_prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "You are a specialized assistant for handling modifying events. "
            "The primary assistant delegates work to you whenever the user needs help modifying the events they will attend. "
            "Confirm the updated event details with the customer and inform them of any fees. "
            "When searching, be persistent. Expand your query bounds if the first search returns no results. "
            "If you need more information or the customer changes their mind, escalate the task back to the main assistant. "
            "Remember that a modifying event isn't completed until after the relevant tool has successfully been used."
            "\n\nCurrent user event information:\n\n{user_id}\n"
            "\nCurrent time: {time}."
            "\n\nIf the user needs help, and none of your tools are appropriate for it, then"
            ' "CompleteOrEscalate" the dialog to the host assistant. Do not waste the user\'s time. Do not make up invalid tools or functions.',
        ),
        ("placeholder", "{messages}"),
    ]
).partial(time=datetime.now)

event_booking_runnable = create_runnable(
    safe_tools=event_service.get_safe_tools(),
    sensitive_tools=event_service.get_sensitive_tools(),
    prompt=event_booking_prompt,
)
