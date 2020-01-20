import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './user-dto.';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    ) {

  }
  async findAllUser(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(email: string): Promise<User> {
    return await this.userRepository.findOne({email});
  }

  async createUser(createUserDto: CreateUserDto): Promise<{success: boolean}> {
    const res = await this.userRepository.insert(createUserDto);
    if (res.identifiers) {
      return {success: true};
    } else {
      return {success: false};
    }
  }
}
