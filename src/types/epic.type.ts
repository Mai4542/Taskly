export interface EpicUser {
  sub: string;
  name: string;
  email: string;
  department: string;
}

export interface Epic {
  id: string;
  epic_id: string;
  title: string;
  description?: string | null;
  deadline?: string | null;
  created_at: string;
  created_by: EpicUser;
  assignee: EpicUser;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  page: number;
  limit: number;
}
