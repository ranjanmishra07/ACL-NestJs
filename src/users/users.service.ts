import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { CreateUserDto } from './user-dto.';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    ) {

  }
  async findAllUser(): Promise<Users[]> {
    return await this.userRepository.find();
  }

  async findOne(email: string): Promise<Users> {
    return await this.userRepository.findOne({email});
  }

  async createUser(createUserDto: CreateUserDto): Promise<{success: boolean}> {
    console.log(typeof createUserDto.email);
    const res = await this.userRepository.insert(createUserDto);
    if (res.identifiers) {
      console.log(res.identifiers, res.generatedMaps, res.raw);
      return {success: true};
    } else {
      return {success: false};
    }
  }
}
