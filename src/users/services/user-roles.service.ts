import { Injectable } from '@nestjs/common';
import { Role } from '../entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from '../entities/user-roles.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRole)
    private readonly userRolesRepositoty: Repository<UserRole>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) { }

  async createUserRoles(roleIds: number[], userId: number) {
    const roles = await this.roleRepository.findByIds(roleIds);
    const user = await this.userRepository.findOne(userId);
    for (const role of roles) {
      // // const userRole = {role, user};
      // const userRole = new UserRole();
      // userRole.role = roleIds;
      const userRole = new UserRole();
      userRole.role = role;
      userRole.user = user;
      console.log('role', userRole);
      await this.userRolesRepositoty.save(userRole);

    }
  }
}