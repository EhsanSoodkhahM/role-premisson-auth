import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { _ } from 'lodash';
import { AuthService } from 'src/auth/auth.service';
import { UserRole } from 'src/auth/user.role.enum';
import { User } from './user.type';

@Injectable()
export class UserService {
  private users = [
    {
      role: UserRole.ADMIN,
      username: 'admin',
      hashPassword:
        '$2b$12$ThfblXxJZoR3HgLASTtVNOezqzCxK38unq4O1379fZmktXyTT0T0i',
      age: null,
      id: 1,
    },
  ];

  constructor(
    @Inject(forwardRef(() => AuthService)) readonly authService: AuthService,
  ) {}
  async findOneById(id: number): Promise<User> {
    const user = _.find(this.users, { id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findOneByUsername(username: string): Promise<User> {
    const user = _.find(this.users, { username });
    return user;
  }

  async findAll() {
    return this.users;
  }

  async getAllUsers() {
    return this.users;
  }

  async getUserRole(username: string) {
    const user = _.find(this.users, { username });
    if (user) {
      return user.role;
    }
    return null;
  }
  async addUser(username: string, hPassword: string, age) {
    const user = new User(username, hPassword);
    user.id = await this.genarateId();
    user.role = UserRole.CUSTOMER;
    user.age = age ? age : null;
    this.users.push(user);
    return user;
  }

  async genarateId() {
    return this.users.length + 1;
  }
}
