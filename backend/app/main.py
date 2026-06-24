from contextlib import asynccontextmanager
from fastapi import Depends, FastAPI
from app.routers import applications
from app.database import create_db_and_tables, get_session


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield


app = FastAPI(
    title="Job Application Intelligence Tracker",
    description="Track job applications, interviews, offers, and follow-ups.",
    version="0.1.0",
    lifespan=lifespan,
)


app.include_router(applications.router)

@app.get("/")
def root() -> dict[str, str]:
    return {
        "message": "Job Application Intelligence Tracker API",
        "docs": "/docs",
    }


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "healthy"}


