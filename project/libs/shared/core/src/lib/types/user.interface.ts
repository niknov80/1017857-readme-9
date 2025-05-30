export interface User {
  id?: string;
  email: string;
  login: string;
  avatar?: string;
  createAt: Date;
  publicationsCount: number;
  subscribersCount: number;
}
