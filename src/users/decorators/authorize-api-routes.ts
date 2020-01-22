import { createParamDecorator, SetMetadata, UseGuards } from '@nestjs/common';


import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../utils/roles.guard';
import { Role } from '../entities/role.entity';

export function Auth(roles: string[], pcode?: string[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    SetMetadata('pcode', pcode),
    UseGuards(AuthGuard('jwt'), RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized"' }),
  );
}
