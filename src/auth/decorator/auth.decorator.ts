import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../role.guard';
import { UserRole } from '../user.role.enum';

export const ROLES_KEY = 'roles';
export const Auth = (...roles: UserRole[]) =>
  applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    UseGuards(AuthGuard('jwt'), RolesGuard),
  );
