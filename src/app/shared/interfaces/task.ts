export interface TaskI {
  id: string;
  title: string;
  description?: string;
  status: boolean;
  createdAt: Date;
}