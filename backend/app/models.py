from datetime import date, datetime
from enum import Enum

from sqlmodel import Field, SQLModel


class ApplicationStatus(str, Enum):
    SAVED = "saved"
    APPLIED = "applied"
    INTERVIEWING = "interviewing"
    OFFER = "offer"
    REJECTED = "rejected"
    WITHDRAWN = "withdrawn"


class JobApplicationBase(SQLModel):
    company: str = Field(min_length=1, max_length=100, index=True)
    position: str = Field(min_length=1, max_length=150, index=True)
    location: str | None = Field(default=None, max_length=150)
    job_url: str | None = Field(default=None, max_length=1000)
    salary_min: int | None = Field(default=None, ge=0)
    salary_max: int | None = Field(default=None, ge=0)
    status: ApplicationStatus = Field(
        default=ApplicationStatus.SAVED,
        index=True,
    )
    applied_date: date | None = None
    follow_up_date: date | None = None
    notes: str | None = None


class JobApplication(JobApplicationBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class JobApplicationCreate(JobApplicationBase):
    pass


class JobApplicationRead(JobApplicationBase):
    id: int
    created_at: datetime
    updated_at: datetime


class JobApplicationUpdate(SQLModel):
    company: str | None = Field(default=None, min_length=1, max_length=100)
    position: str | None = Field(default=None, min_length=1, max_length=150)
    location: str | None = Field(default=None, max_length=150)
    job_url: str | None = Field(default=None, max_length=1000)
    salary_min: int | None = Field(default=None, ge=0)
    salary_max: int | None = Field(default=None, ge=0)
    status: ApplicationStatus | None = None
    applied_date: date | None = None
    follow_up_date: date | None = None
    notes: str | None = None