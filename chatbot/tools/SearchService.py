from datetime import date, datetime
from typing import Optional, List
from langchain_core.runnables import ensure_config
from chatbot.database.Base import BaseClient
from loguru import logger

"""
        Search for events in the community based on various criteria.

        Parameters:
            start_time (Optional[date | datetime]): The start date and time of the event
                in the format YYYY-MM-DD HH:MM. Defaults to None.
            group_name (Optional[str]): The name of the group hosting the event, e.g.,
                "Community Sports Club". Defaults to None.
            activity (Optional[str]): The specific name of the activity or event, e.g.,
                "Basketball" or "Comedy Show". Defaults to None.
            location (Optional[str]): The name or description of the place where the
                event is held, e.g., "Central Park". Defaults to None.
            geo_location (Optional[List[float]]): The latitude and longitude of the
                event's location in decimal degrees, e.g., [40.7128, -74.0060]. Defaults to None.
            frequency (Optional[str]): How often the event is held, e.g., "weekly",
                "daily", or "annually". Defaults to None.
            price (Optional[List[float]]): The cost range to attend the event, provided
                as [min_price, max_price]. Defaults to None.
            category (str): The type of event. Must be one of the following:
                - "hobby-interest": Events related to hobbies or special interests.
                - "community-civic": Community or civic engagement events.
                - "sports-fitness": Sports and fitness-related activities.
                - "education-professional-development": Educational or professional development events.
            limit (int): The maximum number of events to return. Defaults to 20.

        Returns:
            list[dict]: A list of dictionaries where each dictionary represents an event
                matching the search criteria, including details about its name, location,
                schedule, price, and category.

        Example:
            search_event(
                    start_time=2024-10-11 08:15,
                    group_name="Community Sports Club",
                    activity="Basketball",
                    frequency="weekly",
                    category="sports-fitness",
                    limit=10
                )
        """


# Search Service
class SearchService(BaseClient):
    def __init__(self,
                 supabase_url: str = "http://127.0.0.1:54321",
                 supabase_key: str = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
                 username: str = "matmccann@gmail.com",
                 password: str = "g3sUsJz4v5@WPup",
                 ):
        super().__init__(supabase_url, supabase_key, username, password)

    def get_id(self):
        return self._id

    def get_safe_tools(self):
        return [self.search_event]

    def get_sensitive_tools(self):
        return [self.attend_event, ]

    def fetch_user_information(self, **kwargs) -> list[dict]:
        """ fetch_user_flight_information """
        config = ensure_config()
        configuration = config.get("configurable", {})
        user_id = configuration.get("user_id", None)
        # logger.debug(f"User_id: {user_id}")
        if not user_id:
            logger.warning(f"Can not find configuration: {configuration}")
            raise ValueError("No user ID configured.")

        # grab the user's information
        response = self.client.table("users").select("*").eq("id", user_id).execute()
        # logger.debug(response)

        return response.data

    def search_event(
            self,
            start_date: Optional[date | datetime] = None,
            group_name: Optional[str] = None,
            activity: Optional[str] = None,
            category: str = None,
            limit: int = 20) -> list[dict]:
        """
        Search for events in the community based on various criteria.

        Parameters:
            start_date (Optional[date | datetime]): The start date and time of the event
                in the format YYYY-MM-DD HH:MM. Defaults to None.
            group_name (Optional[str]): The name of the group hosting the event, e.g.,
                "Community Sports Club". Defaults to None.
            activity (Optional[str]): The specific name of the activity or event, e.g.,
                "Basketball" or "Comedy Show". Defaults to None.
            category (str): The type of event. Must be one of the following:
                - "hobby-interest": Events related to hobbies or special interests.
                - "community-civic": Community or civic engagement events.
                - "sports-fitness": Sports and fitness-related activities.
                - "education-professional-development": Educational or professional development events.
            limit (int): The maximum number of events to return. Defaults to 20.

        Returns:
            list[dict]: A list of dictionaries where each dictionary represents an event
                matching the search criteria, including details about its name, location,
                schedule, price, and category.
        """

        if (
                not start_date
                and not group_name
                and not activity
                and not category
        ):
            return []

        # Build the query dynamically based on the filters
        query = self.client.table("events").select("*")

        # search by TYPE
        if category:
            query = query.like("category", f"%{category.lower()}%")
        if group_name:
            query = query.like("group_name", f"%{group_name.lower()}%")
        if activity:
            query = query.like("activity", f"%{activity.lower()}%")
        if start_date:
            query = query.gte("start_date", start_date.isoformat())

        # # search by PLACE
        # if location:
        #     query = query.like("location", f"%{location.lower()}%")
        # if geo_location:
        #     query = query.eq("geo_location", geo_location)

        # search by SCHEDULE

        # if end_time:
        #     query = query.lte("scheduled_departure", end_time.isoformat())
        # if frequency:
        #     query = query.eq("frequency", frequency)

        # # search by PRICE
        # if price:
        #     query = query.gte("price", price[0])
        #     query = query.lte("price", price[1])

        # Limit the number of results, and execute
        query.limit(limit)
        response = query.execute()

        logger.debug(response)

        return response.data

    def attend_event(self,
                     user_id: str = None,
                     event_id: str = None,
                     start_date: Optional[date | datetime] = None,
                     group_name: Optional[str] = None,
                     activity: Optional[str] = None,
                     ) -> str:
        """
                Add the event to the user's event list so that the user may attend the event.

                Parameters:
                    user_id (str): The users unique UUID that describes them, their user_info or user_id.
                    event_id (str): An uuid number, the event id.
                    start_date (Optional[date | datetime]): The datetime of the event in the format
                        of YYYY-MM-DD HH:MM. Defaults to None.
                    group_name (Optional[str]): The name of the group hosting the event, e.g., "Community Sports Club".
                        Defaults to None.
                    activity (Optional[str]): The specific name of the activity or event, e.g.,
                        "Basketball" or "Comedy Show". Defaults to None.

                Returns:
                    str: A description of the result of the action to tell if the action was successful or not.
                """

        if not user_id and not event_id:
            logger.error("Arguments not passed: user_id or event_id")
            raise ValueError("No user ID configured.")

        # get the event
        event_response = self.client.table("events").select("*").eq("id", event_id).execute()
        # logger.debug(event_response)

        if len(event_response.data) != 1:
            logger.error(
                f"Event UUID is not unique: found ({event_response.data})\n\t\tthis is a critical error that must be resolved immediately.")
            raise RuntimeError("Event uuid not valid")
        _event = event_response.data
        logger.debug(_event)
        # TODO: add
        # # get the user schedule
        # schedule_response = (self.client.table("user")
        #                   .select("schedule")
        #                   .eq("id", user_id)
        #                   .execute())

        return "The user has added this event to their schedule."
