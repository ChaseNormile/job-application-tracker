import type { Application } from "../types/application";

const API_BASE_URL = "http://127.0.0.1:8000";

export async function getApplications(): Promise<Application[]> {
  const response = await fetch(`${API_BASE_URL}/applications`);
  if (!response.ok) {
    throw new Error("Failed to fetch applications");
  }
  return response.json();
}