
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
    interview_id = interview_response.json()["id"]

    update_response = client.patch(f"/interviews/{interview_id}", json={"completed": True, "notes": "Completed Interview"})
    assert update_response.status_code == 200


    updated_interview = update_response.json()

    assert updated_interview["application_id"] == application_id
    assert updated_interview["interview_type"] == "technical"
    assert updated_interview["interview_date"] == "2026-07-01"
    assert updated_interview["interview_location"] == "Microsoft Teams"
    assert updated_interview["notes"] == "Completed Interview"
    assert updated_interview["completed"] is True
    assert updated_interview["id"] is not None