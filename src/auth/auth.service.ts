import { Injectable, InternalServerErrorException, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../users/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { LoginUserDto } from 'src/users/dto/user-dto';
import { UserRoleService } from 'src/users/services/user-roles.service';
import { UserPermissionService } from 'src/users/services/user-permissions.service';

export const jwtConstants = {
  secret: 'secretKey',
};


export enum Provider {
  GOOGLE = 'google',
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
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
    // const role =  userRes;
    const role = 'role';
    const payload = { email: user.email, role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateOAuthLogin(user: User , provider: Provider): Promise<string> {
    try {
      const payload = {
        email : user.email,
        id : user.id,
        username : user.name,
        provider,
      };
      const jwt: string =  this.jwtService.sign(payload);
      return jwt;
    } catch (err) {
      throw new  InternalServerErrorException('Error while google sign in');
    }
  }
}