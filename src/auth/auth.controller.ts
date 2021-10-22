import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserRegisterDto } from 'src/user/dto/user.register.dto';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user.login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(201)
  @Post('register')
  async registerUser(@Body() registerDto: UserRegisterDto) {
    return await this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: UserLoginDto) {
    return await this.authService.login(loginDto);
  }
}
