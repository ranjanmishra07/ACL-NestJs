import { Injectable, HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/user-dto.';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRoleService } from './user-roles.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userRoleService: UserRoleService,
    ) {

  }
  async findAllUser(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(email: string): Promise<User> {
    return await this.userRepository.findOne({email});
  }

  async createUser(createUserDto: CreateUserDto, params?: string[]): Promise<{success: boolean}> {
    // const userObj = {
    //   name : createUserDto.name,
    //   email: createUserDto.email,
    //   password: createUserDto.password,
    // };
    const user = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = createUserDto.password;

    const userRes = await this.userRepository.save(user);

    const roleIds = createUserDto.roleIds && createUserDto.roleIds.length > 0 &&  createUserDto.roleIds;
    // const res = await this.userRepository.insert(userObj);
    // console.log('ideee', res.identifiers.id);
    try {
      await this.userRoleService.createUserRoles(roleIds, userRes.id);
    } catch ( err) {
      throw new HttpException('role can not be created ', 500);
    }
    if (userRes.id) {
      return {success: true};
    } else {
      return {success: false};
    }
  }
}
