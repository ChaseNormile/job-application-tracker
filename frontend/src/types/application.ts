export interface Application {
  id: number;
  company: string;
  position: string;
  location: string | null;
  job_url: string | null;
  salary_min: number | null;
  salary_max: number | null;
  status: | "saved" | "applied" | "interviewing" | "offer" | "rejected" | "withdrawn";
  applied_date: string;
  follow_up_date: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}