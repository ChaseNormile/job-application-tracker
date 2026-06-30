import { useEffect, useState } from "react";

import { getApplications } from "./api/applications";

import ApplicationTable from "./components/ApplicationTable";
import type { Application } from "./types/application";

import "./App.css";

function App() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadApplications() {
      try {
        setLoading(true);
        setError(null);

        const data = await getApplications();
        setApplications(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    }

    loadApplications();
  }, []);

  return (
    <main>
      <h1>Job Application Tracker</h1>

      {loading && <p>Loading applications...</p>}

      {!loading && error && (
        <p>Unable to load applications: {error}</p>
      )}

      {!loading && !error && applications.length === 0 && (
        <p>No applications yet.</p>
      )}

      {!loading && !error && applications.length > 0 && (
        <ApplicationTable applications={applications} />
      )}
    </main>
  );
}

export default App;