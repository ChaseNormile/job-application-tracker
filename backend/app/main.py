from contextlib import asynccontextmanager
from fastapi import Depends, FastAPI
from app.routers import applications, interviews
from app.database import create_db_and_tables, get_session
from fastapi.middleware.cors import CORSMiddleware





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

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(applications.router)
app.include_router(interviews.router)

@app.get("/")
def root() -> dict[str, str]:
    return {
        "message": "Job Application Intelligence Tracker API",
        "docs": "/docs",
    }


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "healthy"}


