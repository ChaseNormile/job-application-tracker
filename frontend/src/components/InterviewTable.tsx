import type { Interview } from "../types/interview";

interface InterviewTableProps {
    interviews: Interview[];
}

export default function InterviewTable({ interviews }: InterviewTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>Application ID</th>
          <th>Type</th>
          <th>Date</th>
          <th>Location</th>
          <th>Completed</th>
          <th>Notes</th>
        </tr>
      </thead>

      <tbody>
        {interviews.map((interview) => (
          <tr key={interview.id}>
            <td>{interview.application_id}</td>
            <td>{interview.interview_type}</td>
            <td>{interview.interview_date}</td>
            <td>{interview.interview_location || "Not specified"}</td>
            <td>{interview.completed ? "Yes" : "No"}</td>
            <td>{interview.notes || "—"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}