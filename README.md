# Job Application Tracker

A full-stack application for organizing job applications and interviews, built with a **FastAPI** REST API, a **React + TypeScript** frontend, and **SQLite** persistence.

The project demonstrates API development, relational data modeling, request validation, a layered backend architecture, frontend-to-backend communication, and automated API testing.

## Tech stack

| Layer | Technologies |
| --- | --- |
| Frontend | React, TypeScript, Vite |
| Backend | Python, FastAPI, SQLModel, SQLAlchemy |
| Database | SQLite |
| Testing | pytest, FastAPI TestClient, in-memory SQLite |

## Features

- Create, retrieve, update, and delete job application records through REST endpoints.
- Track interview records associated with job applications.
- Record application status, job details, salary ranges, and follow-up dates.
- Filter job applications by status or company, with paginated results.
- Validate request data, including invalid salary ranges.
- View job applications through a React frontend connected to the API.
- Run backend tests against an isolated in-memory database.
- Explore and test endpoints with FastAPI's auto-generated interactive API documentation.

## Project structure

```text
job-application-tracker/
├── backend/
│   ├── app/
│   │   ├── main.py               # FastAPI entry point and CORS configuration
│   │   ├── database.py           # Database engine and session dependency
│   │   ├── models.py             # SQLModel entities and request/response models
│   │   ├── exceptions.py
│   │   ├── routers/              # HTTP endpoints for applications and interviews
│   │   └── services/             # Business logic and persistence operations
│   ├── tests/                    # API tests and test fixtures
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── api/                  # API requests
    │   ├── components/           # React components
    │   ├── types/                # TypeScript types
    │   └── App.tsx
    └── package.json
```

## Run locally

### Prerequisites

- Python 3.12 or a compatible Python 3 version
- Node.js and npm compatible with the version of Vite in `frontend/package.json`

### 1. Clone the repository

```bash
git clone https://github.com/ChaseNormile/job-application-tracker.git
cd job-application-tracker
```

### 2. Start the backend

In the first terminal:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

The API runs at **http://127.0.0.1:8000** by default. The SQLite database is created when the application starts.

- API documentation: http://127.0.0.1:8000/docs
- Health endpoint: http://127.0.0.1:8000/health

### 3. Start the frontend

In a second terminal, from the repository root:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite (typically **http://localhost:5173**). Leave the backend running in the first terminal.

**Local development note:** The frontend currently uses `http://127.0.0.1:8000` as its API base URL, and the FastAPI CORS configuration allows frontend origins on port `5173`.

## API overview

### Job applications

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/applications` | Create an application |
| `GET` | `/applications` | List applications (optional status/company filters and pagination) |
| `GET` | `/applications/{application_id}` | Retrieve an application |
| `PATCH` | `/applications/{application_id}` | Partially update an application |
| `DELETE` | `/applications/{application_id}` | Delete an application |

### Interviews

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/interviews` | Create an interview linked to an application |
| `GET` | `/interviews` | List interviews (paginated) |
| `GET` | `/interviews/{interview_id}` | Retrieve an interview |
| `PATCH` | `/interviews/{interview_id}` | Update an interview |
| `DELETE` | `/interviews/{interview_id}` | Delete an interview |

### Example request

```bash
curl -X POST http://127.0.0.1:8000/applications \
  -H 'Content-Type: application/json' \
  -d '{"company":"Example Company","position":"Software Engineer I","status":"applied"}'
```

## Testing

From the `backend/` directory, with the Python environment activated:

```bash
pytest -q
```

Tests use FastAPI's `TestClient` and a separate in-memory SQLite database, so test records do not need to be written to the development database.

## Potential improvements

- Add more automated tests, including negative and edge-case scenarios.
- Expand the frontend to expose the full set of application and interview management capabilities.
- Add deployment and environment-based configuration for the API URL and database.

## About

Built as a personal software engineering project to practice RESTful API design, backend architecture, database persistence, testing, and React/TypeScript integration.
