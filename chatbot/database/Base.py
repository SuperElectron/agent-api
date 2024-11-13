from supabase import create_client, Client
from loguru import logger


class BaseClient:
    def __init__(self,
                 supabase_url: str = "http://127.0.0.1:54321",
                 supabase_key: str = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
                 username: str = "matmccann@gmail.com",
                 password: str = "g3sUsJz4v5@WPup",
                 ):
        self.supabase_url = supabase_url
        self.supabase_key = supabase_key
        self.client: Client = create_client(self.supabase_url, self.supabase_key)
        self._id = self.sign_in(username, password)

    def sign_in(self, username: str, password: str):
        response = self.client.auth.sign_in_with_password(
            {"email": username, "password": password}
        )
        _user = response.user
        logger.info(_user.id)
        return _user.id
