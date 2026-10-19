import type { Application, ApplicationCreate } from "../types/application";
import { useState } from "react";

interface ApplicationTableProps {
    applications: Application[];
    onDelete: (applicationId: number) => Promise<void>;
    onUpdate: (applicationId: number, updatedData: Partial<ApplicationCreate>) => Promise<void>;
}



export default function ApplicationTable({ applications, onDelete, onUpdate }: ApplicationTableProps) {
    const [editingApplicationId, setEditingApplicationId] = useState<number | null>(null);
    const [editedStatus, setEditedStatus] = useState<ApplicationCreate["status"]>("saved");
    return (
        <table>
            <thead>
                <tr>
                    <th>Company</th>
                    <th>Position</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Applied Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody className="bg-white">
                {applications.map((app) => {
                    const isEditing = editingApplicationId === app.id;

                    return (
                        <tr key={app.id}>
                            <td>{app.company}</td>
                            <td>{app.position}</td>
                            <td>{app.location || "Not specified"}</td>

                            <td>
                                {isEditing ? (
                                    <select
                                        value={editedStatus}
                                        onChange={(e) =>
                                            setEditedStatus(
                                                e.target.value as ApplicationCreate["status"],
                                            )
                                        }
                                    >
                                        <option value="saved">Saved</option>
                                        <option value="applied">Applied</option>
                                        <option value="interviewing">Interviewing</option>
                                        <option value="offer">Offer</option>
                                        <option value="rejected">Rejected</option>
                                        <option value="withdrawn">Withdrawn</option>
                                    </select>
                                ) : (
                                    app.status
                                )}
                            </td>

                            <td>{app.applied_date || "—"}</td>

                            <td>
                                {isEditing ? (
                                    <>
                                        <button
                                            type="button"
                                            onClick={async () => {
                                                await onUpdate(app.id, {
                                                    status: editedStatus,
                                                });

                                                setEditingApplicationId(null);
                                            }}
                                        >
                                            Save
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => {
                                                setEditingApplicationId(null);
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setEditingApplicationId(app.id);
                                                setEditedStatus(app.status);
                                            }}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => {
                                                const confirmed = window.confirm(
                                                    "Are you sure you want to delete this application?",
                                                );

                                                if (confirmed) {
                                                    onDelete(app.id);
                                                }
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
