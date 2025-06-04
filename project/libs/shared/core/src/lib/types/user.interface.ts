export interface User {
  id?: string;
  email: string;
  login: string;
  avatar?: string;
  createdAt: Date;
  publicationsCount: number;
  subscribersCount: number;
}
