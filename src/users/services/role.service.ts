import { Injectable, HttpException } from '@nestjs/common';
import { Role } from '../entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRoleDTO, RolePermissionDTO } from '../dto/role.dto';
import { Permission } from '../entities/permission.entity';
import { PermissionService } from './permission.service';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly permissionService: PermissionService
  ) { }

  async checkRoleIfExists(roleIds: number[]): Promise<boolean> {
    const roles = await this.roleRepository.findByIds(roleIds);
    if (roles.length === roleIds.length) {
      return true;
    } else {
      return false;
    }
  }

  async createRoles(roleDto: UserRoleDTO): Promise<string> {
    const role = new Role()
    role.roleName = roleDto.roleName;
    role.priority = roleDto.priority;
    try {
      await this.roleRepository.insert(role);
      return 'Role created successfully';
    } catch (err) {
      // tslint:disable-next-line: no-console
      console.log(err);
    }
    // return 'Role created Successfully'
  }

  async createRolePermissions(rolePermissionDto: RolePermissionDTO): Promise<string> {
    const role = await this.roleRepository.findOne(rolePermissionDto.roleId, {relations : ['permissions']});
    if (!role) { throw new HttpException('ROLE NOT FOUND', 404); }
    const permissions = await this.permissionService.findPermissionByIds(rolePermissionDto.permissionsIds);
    if (!permissions) { throw new HttpException('Permission not found', 404); }
    role.permissions = permissions;
    try {
      await this.roleRepository.save(role);
      return 'Permission added to role';
    } catch (e) {
      throw e;
    }

  }

  async getRolePermissions(roleId : number) : Promise<Permission[]> {
    const role = await this.roleRepository.findOne(roleId, {relations : ['permissions']});
    if (!role) { throw new HttpException('ROLE NOT FOUND', 404); }
    return role.permissions;
  }
}
