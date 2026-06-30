from datetime import datetime

from sqlmodel import Session, select
from app.models import (
    InterviewType,
    Interview,
    InterviewCreate,
    InterviewUpdate,
)

def create_interview(
    session: Session,
    interview_data: InterviewCreate,
) -> Interview:
    interview = Interview.model_validate(interview_data)

    session.add(interview)
    session.commit()
    session.refresh(interview)
    
    return interview

def get_interviews(
    session: Session,
    offset: int = 0,
    limit: int = 20,
) -> list[Interview]:
    statement = select(Interview).offset(offset).limit(limit).order_by(Interview.date)
    interviews = session.exec(statement).all()
    
    return interviews

def get_interview_by_id(
    session: Session,
    interview_id: int,
) -> Interview | None:
    return session.get(Interview, interview_id)


def update_interview(
    session: Session,
    interview_id: int,
    interview_data: InterviewUpdate,
) -> Interview | None:
    interview = get_interview_by_id(session, interview_id)
    
    if interview is None:
        return None

    for key, value in interview_data.model_dump(exclude_unset=True).items():
        setattr(interview, key, value)

    interview.updated_at = datetime.utcnow()

    session.add(interview)
    session.commit()
    session.refresh(interview)
    
    return interview

def delete_interview(
    session: Session,
    interview_id: int,
) -> bool:
    interview = get_interview_by_id(session, interview_id)
    
    if interview is None:
        return False

    session.delete(interview)
    session.commit()
    
    return True