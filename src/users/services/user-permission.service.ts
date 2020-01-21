import { Injectable } from '@nestjs/common';
import {UserPermissions} from '../entities/user-permission.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class UserPermissionService {
  constructor(
      @InjectRepository(UserPermissions)
      private readonly userPermissionRepository : Repository<UserPermissions>
  ) {}
  
}
