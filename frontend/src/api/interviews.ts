import type { Interview, InterviewCreate } from "../types/interview";

const API_BASE_URL = "http://127.0.0.1:8000";

export async function getInterviews(): Promise<Interview[]> {
  const response = await fetch(`${API_BASE_URL}/interviews`);

  if (!response.ok) {
    throw new Error("Failed to fetch interviews");
  }

  return response.json();
}

export async function createInterview(
  interviewData: InterviewCreate,
): Promise<Interview> {
  const response = await fetch(`${API_BASE_URL}/interviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(interviewData),
  });

  if (!response.ok) {
    throw new Error("Failed to create interview");
  }

  return response.json();
}

export async function deleteInterview(
  interviewId: number,
): Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}/interviews/${interviewId}`,
    {
      method: "DELETE",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to delete interview");
  }
}

export async function updateInterview(
  interviewId: number,
  interviewData: Partial<InterviewCreate>,
): Promise<Interview> {
  const response = await fetch(
    `${API_BASE_URL}/interviews/${interviewId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(interviewData),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to update interview");
  }

  return response.json();
}