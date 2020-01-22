import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Role } from '../entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult } from 'typeorm';
import { UserRole } from '../entities/user-roles.entity';
import { User } from '../entities/user.entity';
import { CreateUserRolesDto } from '../dto/user-dto';

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

  async createUserRoles(createUserRolesDto: CreateUserRolesDto): Promise<{success: boolean, message: string}> {
    let result: InsertResult;
    let userRoleMessage;
    try {
      const roles = await this.roleRepository.findByIds(createUserRolesDto.roleIds);
      if (!roles ) {throw new HttpException('failed to fetch the roles', HttpStatus.NOT_FOUND); }
      const user = await this.userRepository.findOne(createUserRolesDto.id);
      if (!user) { throw new HttpException('user does not exist', HttpStatus.NOT_FOUND); }
      const userObj: Array<{role: Role, user: User}> = [];
      for (const role of roles) {
        userObj.push({role, user});
      }
      result = await this.userRolesRepositoty.insert(userObj);
    } catch (err) {
      throw(err);
      userRoleMessage = {success: false, message: `failed to create the permssion for user ${createUserRolesDto.id}`};
    }
    if ( result.identifiers && result.identifiers.length === createUserRolesDto.roleIds.length) {
        userRoleMessage = {success: true, message: 'role has been created', permission : result.identifiers};
    } else {
      userRoleMessage = {success: false, message: 'failed to create the role'};
    }
    return userRoleMessage;
    }

  async getUserRoles(user: User): Promise<Role[]> {
    const {userRole} = await this.userRepository.findOne(user.id, {relations: ['userRole']});
    const ids = userRole.map(r => r.id);
    const userRoles = await this.userRolesRepositoty.findByIds(ids, {relations: ['role']});
    const roleRes = userRoles.map(p => p.role);
    return roleRes;
  }
}
