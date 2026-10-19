import type { Application, ApplicationCreate } from "../types/application";


const API_BASE_URL = "http://127.0.0.1:8000";

export async function getApplications(): Promise<Application[]> {
  const response = await fetch(`${API_BASE_URL}/applications`);
  if (!response.ok) {
    throw new Error("Failed to fetch applications");
  }
  return response.json();
}

export async function createApplication(applicationData: ApplicationCreate): Promise<Application> {
  const response = await fetch(`${API_BASE_URL}/applications`, {
    method: "POST",
    headers: {  
      "Content-Type": "application/json",
    },
    body: JSON.stringify(applicationData),
  });

  if (!response.ok) {
    throw new Error("Failed to create application");
  }

  return response.json();
}

export async function deleteApplication(applicationId: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/applications/${applicationId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete application");
  }
}

export async function updateApplication(applicationId: number, applicationData: Partial<ApplicationCreate>): Promise<Application> {
  const response = await fetch(`${API_BASE_URL}/applications/${applicationId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(applicationData),
  });

  if (!response.ok) {
    throw new Error("Failed to update application");
  }

  return response.json();
}