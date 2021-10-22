import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRegisterDto } from 'src/user/dto/user.register.dto';
import { UserService } from 'src/user/user.service';
import { UserLoginDto } from './dto/user.login.dto';
import { hashSync, compareSync } from 'bcrypt';
import { UserRole } from './user.role.enum';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService)) readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  async register(userRegisterDto: UserRegisterDto): Promise<any> {
    const { username, age, password } = userRegisterDto;
    const oldUser = await this.userService.findOneByUsername(username);
    if (oldUser) {
      throw new UnprocessableEntityException('User aleardy exist');
    }
    const user = await this.userService.addUser(
      username,
      hashSync(password, 12),
      age,
    );
    const accessToken = await this.signJWT(username, user.id);
    return { id: user.id, username, age, accessToken };
  }

  async signJWT(username: string, id: number): Promise<string> {
    return await this.jwtService.sign({ username, sub: id });
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByUsername(username);
    if (user && compareSync(pass, user.hashPassword)) {
      const { hashPassword, ...result } = user;
      return result;
    }
    return null;
  }

  async login(dto: UserLoginDto) {
    const user = await this.userService.findOneByUsername(dto.username);
    if (!user || !compareSync(dto.password, user.hashPassword)) {
      throw new UnauthorizedException();
    }
    user.accessToken = await this.signJWT(user.username, user.id);
    return user;
  }
}
