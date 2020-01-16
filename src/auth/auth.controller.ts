import { Controller, Post, UseGuards, Body, Get, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/user-dto.';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  loginn() {
    // initiates the Google OAuth2 login flow
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Req() req) {
    const jwt: string = req.user.jwt;
    if (jwt) return jwt
    else console.log('ERRRRRRRR')
  }

}
