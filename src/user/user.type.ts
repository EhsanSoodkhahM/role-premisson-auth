import { UserRole } from 'src/auth/user.role.enum';

export class User {
  id: number;
  username: string;
  hashPassword: string;
  age: number;
  role: UserRole;
  accessToken: string;

  constructor(username: string, hPassword: string) {
    this.username = username;
    this.hashPassword = hPassword;
  }
}
