import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Role } from '../entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult } from 'typeorm';
import { UserRole } from '../entities/user-roles.entity';
import { User } from '../entities/user.entity';
import { CreateUserRolesDto, CreateUserAccessDto } from '../dto/user-dto';
import { UserAccess } from '../entities/user-access.entity';

@Injectable()
export class UserAccessService {
  constructor(
    @InjectRepository(UserRole)
    private readonly userRolesRepositoty: Repository<UserRole>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(UserAccess)
    private readonly userAccessRepository: Repository<UserAccess>,
  ) { }

  async createUserAccess(createUserAccessDto: CreateUserAccessDto): Promise<{success: boolean, message: string, result?: any}> {
    const userId = createUserAccessDto.userId;
    const user = await this.userRepository.findOne(userId);
    if (!user) {throw new HttpException('user does not exist', HttpStatus.NOT_FOUND); }
    const result = await this.userAccessRepository.insert(createUserAccessDto);
    if ( result.identifiers && result.identifiers.length > 0) {
      return {success: true, message: 'role has been created', result : result.identifiers};
  } else {
    return  {success: false, message: 'failed to create the role'};
  }
  }
}
