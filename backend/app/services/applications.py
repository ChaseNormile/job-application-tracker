from datetime import datetime

from sqlmodel import Session, select
from app.exceptions import InvalidSalaryRangeError
from app.models import (
    ApplicationStatus,
    JobApplication,
    JobApplicationCreate,
    JobApplicationUpdate,
)

def validate_salary_range(
    salary_min: float | None,
    salary_max: float | None,
) -> None:
    if (
        salary_min is not None
        and salary_max is not None
        and salary_min > salary_max
    ):
        raise InvalidSalaryRangeError(
            "salary_min cannot be greater than salary_max"
        )


def create_application(
    session: Session,
    application_data: JobApplicationCreate,
) -> JobApplication:
    validate_salary_range(
        salary_min=application_data.salary_min,
        salary_max=application_data.salary_max
    )
    application = JobApplication.model_validate(application_data)

    session.add(application)
    session.commit()
    session.refresh(application)
    
    return application


def get_applications(
    session: Session,
    application_status: ApplicationStatus | None = None,
    company: str | None = None,
    offset: int = 0,
    limit: int = 20,
) -> list[JobApplication]:
    statement = select(JobApplication)

    if application_status is not None:
        statement = statement.where(
            JobApplication.status == application_status
        )

    if company is not None:
        statement = statement.where(
            JobApplication.company.contains(company)
        )

    statement = (
        statement
        .order_by(JobApplication.created_at.desc())
        .offset(offset)
        .limit(limit)
    )

    return list(session.exec(statement).all())


def get_application_by_id(
    session: Session,
    application_id: int,
) -> JobApplication | None:
    return session.get(JobApplication, application_id)


def update_application(
    session: Session,
    application: JobApplication,
    application_data: JobApplicationUpdate,
) -> JobApplication:
    

    update_data = application_data.model_dump(exclude_unset=True)

    new_salary_min = update_data.get(
        "salary_min",
        application.salary_min,
    )

    new_salary_max = update_data.get(
        "salary_max",
        application.salary_max,
    )

    validate_salary_range(
        salary_min=new_salary_min,
        salary_max=new_salary_max,
    )


    for field, value in update_data.items():
        setattr(application, field, value)

    application.updated_at = datetime.utcnow()

    session.add(application)
    session.commit()
    session.refresh(application)

    return application


def delete_application(
    session: Session,
    application: JobApplication,
) -> None:
    session.delete(application)
    session.commit()