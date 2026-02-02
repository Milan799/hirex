export interface User {
  id: string;
  fullName: string | null;
  email: string;
  password: string;
}

export const users: User[] = [];
