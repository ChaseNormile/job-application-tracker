from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlmodel import Session

from app.database import get_session
from app.models import (
    InterviewType,
    InterviewCreate,
    InterviewRead,
    InterviewUpdate,
)
from app.services import interviews as interview_service


SessionDependency = Annotated[Session, Depends(get_session)]

router = APIRouter(
    prefix="/interviews",
    tags=["interviews"],
)

@router.post(
    "",
    response_model=InterviewRead,
    status_code=status.HTTP_201_CREATED,
)

def create_interview(
    interview_data: InterviewCreate,
    session: SessionDependency,
):
    return interview_service.create_interview(
        session=session,
        interview_data=interview_data,
    )

@router.get("", response_model=list[InterviewRead])
def read_interviews(
    session: SessionDependency,
    offset: int = Query(default=0, ge=0),
    limit: int = Query(default=20, ge=1, le=100),
):
    return interview_service.get_interviews(
        session=session,
        offset=offset,
        limit=limit,
    )

@router.get("/{interview_id}", response_model=InterviewRead)
def read_interview(
    interview_id: int,
    session: SessionDependency,
):
    interview = interview_service.get_interview_by_id(
        session=session,
        interview_id=interview_id,
    )
    if not interview:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Interview not found")
    return interview


@router.patch(
    "/{interview_id}",
    response_model=InterviewRead,
)
def update_interview(
    interview_id: int,
    interview_data: InterviewUpdate,
    session: SessionDependency,
):
    interview = interview_service.update_interview(
        session=session,
        interview_id=interview_id,
        interview_data=interview_data,
    )

    if interview is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Interview not found",
        )

    return interview


@router.delete(
    "/{interview_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_interview(
    interview_id: int,
    session: SessionDependency,
) -> None:
    success = interview_service.delete_interview(
        session=session,
        interview_id=interview_id,
    )

    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Interview not found",
        )