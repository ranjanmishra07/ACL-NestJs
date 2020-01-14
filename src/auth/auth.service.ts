import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/users/users.entity';
import { LoginUserDto } from 'src/users/user-dto.';

export const jwtConstants = {
  secret: 'secretKey',
};

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: LoginUserDto) {
    const userRes = await this.usersService.findOne(user.email);
    if (!userRes) {
      throw Error('no user found');
    }
    const role =  userRes.role;
    const payload = { email: user.email, role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}