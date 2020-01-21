import {Injectable} from '@nestjs/common';
import { Role } from '../entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor (
    @InjectRepository(Role)
    private readonly roleService: Repository<Role>,
  ) {}

  async checkRoleIfExists(roleIds: number[]): Promise<boolean> {
    const roles = await this.roleService.findByIds(roleIds);
    if (roles.length  === roleIds.length) {
      return true;
    } else {
      return false;
    }
  }
}
