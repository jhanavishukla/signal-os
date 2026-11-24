from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.core.config import settings
from app.core.sqlite_db import init_db, seed_db
from app.api.endpoints import router as api_v1_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize and seed database tables cleanly
    init_db()
    seed_db()
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan
)

# CORS setup for web client
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check endpoint
@app.get("/health", tags=["System"])
def health_check():
    return {
        "status": "healthy",
        "service": "SignalOS Intelligence Core",
        "version": settings.VERSION,
        "environment": settings.ENV
    }

# Mount API v1 router
app.include_router(api_v1_router, prefix=settings.API_V1_STR)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
