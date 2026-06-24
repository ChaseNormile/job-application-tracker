
def test_create_application(client):
    response = client.post(
        "/applications",
        json={
            "company": "Northrop Grumman",
            "position": "Software Engineer I",
            "location": "Chandler, AZ",
            "status": "applied",
            "salary_min": 500,
            "salary_max": 8,
        },
    )

    assert response.status_code == 201
    
    created_application = response.json()
    application_id = created_application["id"]

    delete_response = client.delete(f"/applications/{application_id}")
    assert delete_response.status_code == 204

    update_response = client.get(f"/applications/{application_id}")


    assert update_response.status_code == 404


