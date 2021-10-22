import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { UserRole } from 'src/auth/user.role.enum';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}
  @Auth(UserRole.CUSTOMER)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOneById(+id);
  }

  @Auth(UserRole.ADMIN)
  @Get('')
  async findAll() {
    return await this.userService.findAll();
  }
}
