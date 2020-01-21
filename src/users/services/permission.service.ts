import {Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '../entities/permission.entity';

@Injectable()
export class PermissionService {
  constructor (
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async checkPermissionsIfExists(permssionIds: number[]): Promise<boolean> {
    const permissions = await this.permissionRepository.findByIds(permssionIds);
    if (permissions.length  === permssionIds.length) {
      return true;
    } else {
      return false;
    }
  }
}