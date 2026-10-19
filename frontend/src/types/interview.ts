export interface Interview {
  id: number;
  application_id: number;
  interview_type:
    | "screening"
    | "technical"
    | "behavioral"
    | "final"
    | "onsite"
    | "phone"
    | "other";
  interview_date: string;
  interview_location: string | null;
  notes: string | null;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface InterviewCreate {
  application_id: number;
  interview_type:
    | "screening"
    | "technical"
    | "behavioral"
    | "final"
    | "onsite"
    | "phone"
    | "other";
  interview_date: string;
  interview_location: string | null;
  notes: string | null;
  completed: boolean;
}