import type { Application } from "../types/application";

interface ApplicationTableProps {
  applications: Application[];
}

export default function ApplicationTable({ applications }: ApplicationTableProps) {
  return (
    <table>
        <thead>
            <tr>
                <th>Company</th>
                <th>Position</th>
                <th>Location</th>
                <th>Status</th>
                <th>Applied Date</th>
            </tr>
        </thead>
        <tbody className="bg-white">
            {applications.map((app) => (
                <tr key={app.id}>
                    <td>{app.company}</td>
                    <td>{app.position}</td>
                    <td>{app.location || "Not specified"}</td>
                    <td>{app.status}</td>
                    <td>{app.applied_date}</td>
                </tr>
            ))}
        </tbody>
    </table>
  );
}
