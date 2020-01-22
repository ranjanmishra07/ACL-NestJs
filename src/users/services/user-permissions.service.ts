import { Injectable, HttpException } from '@nestjs/common';
import { Role } from '../entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult } from 'typeorm';
import { UserRole } from '../entities/user-roles.entity';
import { User } from '../entities/user.entity';
import { UserPermissions } from '../entities/user-permission.entity';
import { Permission } from '../entities/permission.entity';
import { CreateUserPermissionsDto } from '../dto/user-dto';

@Injectable()
export class UserPermissionService {
  constructor(
    @InjectRepository(UserPermissions)
    private readonly userPermisionRepository: Repository<UserPermissions>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) { }

  async createUserPermissions(createUserPermissionsDto: CreateUserPermissionsDto): Promise<{ success: boolean, message: string }> {
    let result: InsertResult;
    let userRoleMessage;
    try {
      const permissions = await this.permissionRepository.findByIds(createUserPermissionsDto.permissionIds);
      const user = await this.userRepository.findOne(createUserPermissionsDto.id);
      if (!user) { throw new HttpException('User not found', 404) }
      const userObj: Array<{ permission: Permission, user: User }> = [];
      for (const permission of permissions) {
        userObj.push({ permission, user });
      }
      result = await this.userPermisionRepository.insert(userObj);
    } catch (err) {
      throw err;
      userRoleMessage = { success: false, message: `failed to create the permssion for user ${createUserPermissionsDto.id}` };
    }
    if (result.identifiers && result.identifiers.length === createUserPermissionsDto.permissionIds.length) {
      userRoleMessage = { success: true, message: 'permssion has been created', permission: result.identifiers };
    } else {
      userRoleMessage = { success: false, message: 'failed to create the permission' };
    }
    return userRoleMessage;
  }

  async getUserPermissions(user: User): Promise<Permission[]> {
    const { permissions } = await this.userRepository.findOne(user.id, { relations: ['permissions'] });
    const ids = permissions.map(p => p.id);
    const userPermissions = await this.userPermisionRepository.findByIds(ids, { relations: ['permission'] });
    const permissionRes = userPermissions.map(p => p.permission);
    return permissionRes;
  }

  async checkUserPermission(user: User, pcode: string): Promise<boolean> {
    const { permissions } = await this.userRepository.findOne(user.id, { relations: ['permissions'] });
    const userPermissions = permissions.map(p => p.permission.pcode);
    // arrayObj.filter(x=>normArr.includes(x.name) )
    if (userPermissions.includes(pcode)) {
      return true;
    }
    return false;
  }
}
