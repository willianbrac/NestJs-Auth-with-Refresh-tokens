export class User {
  id: string;
  username: string;
  email: string;
  password: string;
  salt: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
