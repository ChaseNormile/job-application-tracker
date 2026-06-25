
def test_create_interview(client):
    response = client.post(
        "/applications",
        json={
            "company": "Northrop Grumman",
            "position": "Software Engineer I",
            "location": "Chandler, AZ",
            "status": "applied",
        },
    )

    assert response.status_code == 201
    
    created_application = response.json()
    application_id = created_application["id"]

    interview_response = client.post(
            "/interviews",
            json={
                "application_id": application_id,
                "interview_type": "technical",
                "interview_date": "2026-07-01",
                "interview_location": "Microsoft Teams",
                "notes": "Prepare C++ and data-structure questions",
                "completed": False,
            },
        )

    print(response.status_code)
    print(response.json())

    assert interview_response.status_code == 201

    created_interview = interview_response.json()

    assert created_interview["application_id"] == application_id
    assert created_interview["interview_type"] == "technical"
    assert created_interview["interview_date"] == "2026-07-01"
    assert created_interview["interview_location"] == "Microsoft Teams"
    assert created_interview["notes"] == "Prepare C++ and data-structure questions"
    assert created_interview["completed"] is False
    assert created_interview["id"] is not None