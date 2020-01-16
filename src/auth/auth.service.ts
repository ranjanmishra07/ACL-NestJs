import { Injectable, InternalServerErrorException, HttpException, HttpStatus, Inject, forwardRef } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/users/users.entity';
import { LoginUserDto, CreateUserDto } from 'src/users/user-dto.';
import { httpErrorMessage } from 'src/errorModule/error-message';

export enum Provider {
  GOOGLE = 'google'
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) { }

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
    const role = userRes.role;
    const payload = { email: user.email, role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateOAuthLogin(user: Users , provider: Provider): Promise<string> {
    try {
      const payload = {
        email : user.email,
        id : user.id,
        role : user.role,
        username : user.name,
        provider
      }
      const jwt: string =  this.jwtService.sign(payload);
      return jwt;
    }
    catch (err) {
      throw new InternalServerErrorException(httpErrorMessage.outhInternalError, err.message);
    }
  }
}