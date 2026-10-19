import { useState } from "react";

import type { ApplicationCreate } from "../types/application";

interface ApplicationFormProps {
    onApplicationCreated: (application: ApplicationCreate) => Promise<void>;
}

export default function ApplicationForm({
    onApplicationCreated,
}: ApplicationFormProps) {
    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");
    const [location, setLocation] = useState("");
    const [jobUrl, setJobUrl] = useState("");
    const [status, setStatus] =
        useState<ApplicationCreate["status"]>("saved");
    const [appliedDate, setAppliedDate] = useState("");
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const applicationData: ApplicationCreate = {
            company,
            position,
            location: location || null,
            job_url: jobUrl || null,
            status,
            applied_date: appliedDate || null,
        };

        try {
            setSubmitting(true);
            setSubmitError(null);

            await onApplicationCreated(applicationData);

            setCompany("");
            setPosition("");
            setLocation("");
            setStatus("saved");
            setAppliedDate("");
        } catch (error) {
            if (error instanceof Error) {
                setSubmitError(error.message);
            } else {
                setSubmitError("Unable to create application");
            }
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="company">Company</label>
                <input
                    id="company"
                    type="text"
                    value={company}
                    onChange={(event) => setCompany(event.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="position">Position</label>
                <input
                    id="position"
                    type="text"
                    value={position}
                    onChange={(event) => setPosition(event.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="location">Location</label>
                <input
                    id="location"
                    type="text"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                />
            </div>

            <div>
                <label htmlFor="jobUrl">Job URL</label>
                <input
                    id="jobUrl"
                    type="text"
                    value={jobUrl}
                    onChange={(event) => setJobUrl(event.target.value)}
                />
            </div>

            <div>
                <label htmlFor="appliedDate">Applied Date</label>
                <input
                    id="appliedDate"
                    type="date"
                    value={appliedDate}
                    onChange={(event) => setAppliedDate(event.target.value)}
                />
            </div>

            <div>
                <label htmlFor="status">Status</label>
                <select
                    id="status"
                    value={status}
                    onChange={(event) =>
                        setStatus(event.target.value as ApplicationCreate["status"])
                    }
                >
                    <option value="saved">Saved</option>
                    <option value="applied">Applied</option>
                    <option value="interviewing">Interviewing</option>
                    <option value="offer">Offer</option>
                    <option value="rejected">Rejected</option>
                    <option value="withdrawn">Withdrawn</option>
                </select>
            </div>

            {submitError && <p>{submitError}</p>}

            <button type="submit" disabled={submitting}>
                {submitting ? "Adding..." : "Add Application"}
            </button>
        </form>
    );
}