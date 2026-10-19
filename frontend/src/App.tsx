import { useEffect, useState } from "react";

import {
  getApplications,
  createApplication,
  deleteApplication,
  updateApplication,
} from "./api/applications";
import { getInterviews } from "./api/interviews";

import ApplicationForm from "./components/ApplicationForm";
import ApplicationTable from "./components/ApplicationTable";
import InterviewTable from "./components/InterviewTable";

import type { Application, ApplicationCreate } from "./types/application";
import type { Interview } from "./types/interview";

import "./App.css";

function App() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [interviews, setInterviews] = useState<Interview[]>([]);

  const [loading, setLoading] = useState(true);

  const [loadError, setLoadError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [updateError, setUpdateError] = useState<string | null>(null);

  async function handleApplicationCreated(
    applicationData: ApplicationCreate,
  ) {
    const newApplication = await createApplication(applicationData);

    setApplications((currentApplications) => [
      newApplication,
      ...currentApplications,
    ]);
  }

  async function handleApplicationDeleted(applicationId: number) {
    try {
      setDeleteError(null);

      await deleteApplication(applicationId);

      setApplications((currentApplications) =>
        currentApplications.filter((app) => app.id !== applicationId),
      );
    } catch (error) {
      if (error instanceof Error) {
        setDeleteError(error.message);
      } else {
        setDeleteError("Unable to delete application");
      }
    }
  }

  async function handleApplicationUpdated(
    applicationId: number,
    updatedData: Partial<ApplicationCreate>,
  ) {
    try {
      setUpdateError(null);

      const updatedApplication = await updateApplication(
        applicationId,
        updatedData,
      );

      setApplications((currentApplications) =>
        currentApplications.map((app) =>
          app.id === applicationId ? updatedApplication : app,
        ),
      );
    } catch (error) {
      if (error instanceof Error) {
        setUpdateError(error.message);
      } else {
        setUpdateError("Unable to update application");
      }
    }
  }

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setLoadError(null);

        const applicationData = await getApplications();
        setApplications(applicationData);

        const interviewData = await getInterviews();
        setInterviews(interviewData);
      } catch (error) {
        if (error instanceof Error) {
          setLoadError(error.message);
        } else {
          setLoadError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <main>
      <h1>Job Application Tracker</h1>

      {deleteError && (
        <p>Unable to delete application: {deleteError}</p>
      )}

      {updateError && (
        <p>Unable to update application: {updateError}</p>
      )}

      {loading && <p>Loading data...</p>}

      {!loading && loadError && (
        <p>Unable to load data: {loadError}</p>
      )}

      {!loading && !loadError && applications.length === 0 && (
        <p>No applications yet.</p>
      )}

      {!loading && !loadError && applications.length > 0 && (
        <ApplicationTable
          applications={applications}
          onDelete={handleApplicationDeleted}
          onUpdate={handleApplicationUpdated}
        />
      )}

      {!loading && !loadError && (
        <ApplicationForm onApplicationCreated={handleApplicationCreated} />
      )}

      {!loading && !loadError && (
        <>
          <h2>Interviews</h2>

          {interviews.length === 0 ? (
            <p>No interviews yet.</p>
          ) : (
            <InterviewTable interviews={interviews} />
          )}
        </>
      )}
    </main>
  );
}

export default App;