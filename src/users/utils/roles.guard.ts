import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserPermissionService } from '../services/user-permissions.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userPermissionService: UserPermissionService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const pcode = this.reflector.get('pcode', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    let permissions: boolean;
    if (!pcode) {
      permissions = true;
    } else {
      permissions = await this.userPermissionService.checkUserPermission(user, pcode);
    }
    const role = user.role.map(r => r.roleName);
    const hasRole = () => roles.includes(role[0]);
    return user && user.role && hasRole() && permissions;
  }
}
