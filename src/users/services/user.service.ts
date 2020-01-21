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

  async createUser(createUserDto: CreateUserDto): Promise<{}> {
    const user = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = createUserDto.password;

    const userRes = await this.userRepository.save(user);
    if (userRes.id) {
      const userCreateMessage = {success: true, message: 'user has been created '};
      return {userCreateMessage};
    } else {
      return new HttpException({success: false, message: 'user cant be created'}, 500);
    }
  }
}
