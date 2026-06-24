from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlmodel import Session

from app.database import get_session
from app.models import (
    ApplicationStatus,
    JobApplicationCreate,
    JobApplicationRead,
    JobApplicationUpdate,
)
from app.services import applications as application_service
from app.exceptions import InvalidSalaryRangeError

SessionDependency = Annotated[Session, Depends(get_session)]

router = APIRouter(
    prefix="/applications",
    tags=["applications"],
)


@router.post(
    "",
    response_model=JobApplicationRead,
    status_code=status.HTTP_201_CREATED,
)
def create_application(
    application_data: JobApplicationCreate,
    session: SessionDependency,
):
    try:
        return application_service.create_application(
            session=session,
            application_data=application_data,
        )
    except InvalidSalaryRangeError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@router.get(
    "",
    response_model=list[JobApplicationRead],
)
def read_applications(
    session: SessionDependency,
    application_status: ApplicationStatus | None = None,
    company: str | None = None,
    offset: int = Query(default=0, ge=0),
    limit: int = Query(default=20, ge=1, le=100),
):
    return application_service.get_applications(
        session=session,
        application_status=application_status,
        company=company,
        offset=offset,
        limit=limit,
    )


@router.get(
    "/{application_id}",
    response_model=JobApplicationRead,
)
def read_application(
    application_id: int,
    session: SessionDependency,
):
    application = application_service.get_application_by_id(
        session=session,
        application_id=application_id,
    )

    if application is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application not found",
        )

    return application


@router.patch(
    "/{application_id}",
    response_model=JobApplicationRead,
)
def update_application(
    application_id: int,
    application_data: JobApplicationUpdate,
    session: SessionDependency,
):
    application = application_service.get_application_by_id(
        session=session,
        application_id=application_id,
    )

    if application is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application not found",
        )

  
    try:
        return application_service.update_application(
            session=session,
            application=application,
            application_data=application_data,
        )
    except InvalidSalaryRangeError as error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(error),
        ) from error

    return application_service.update_application(
        session=session,
        application=application,
        application_data=application_data,
    )


@router.delete(
    "/{application_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_application(
    application_id: int,
    session: SessionDependency,
) -> None:
    application = application_service.get_application_by_id(
        session=session,
        application_id=application_id,
    )

    if application is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application not found",
        )

    application_service.delete_application(
        session=session,
        application=application,
    )