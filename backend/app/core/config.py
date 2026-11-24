from pydantic_settings import BaseSettings
from pydantic import ConfigDict
from typing import List, Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "SignalOS Backend API"
    VERSION: str = "0.1.0"
    API_V1_STR: str = "/api/v1"
    
    # Environment & Security
    ENV: str = "development"
    DEBUG: bool = True
    SECRET_KEY: str = "supersecret_signalos_dev_key_change_in_production"
    
    # CORS
    CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ]
    
    DATABASE_URL: str = "sqlite:///./signalos.db"
    DEFAULT_LLM_PROVIDER: str = "mock"

    model_config = ConfigDict(case_sensitive=True, env_file=".env", extra="ignore")

settings = Settings()
