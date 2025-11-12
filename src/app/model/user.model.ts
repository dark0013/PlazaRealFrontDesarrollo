export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  telephone: string;
  role: string;
  avatar?: string;
  status: boolean;
}