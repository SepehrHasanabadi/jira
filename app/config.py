import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv(os.path.join(os.getcwd(), '.env'))


class Settings(BaseSettings):
    ES_ENDPOINT: str = os.getenv('ES_ENDPOINT')


settings = Settings()