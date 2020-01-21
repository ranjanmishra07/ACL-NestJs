import { Controller, Request, Post, UseGuards, Body, Get, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/dto/user-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin()
  {
      // initiates the Google OAuth2 login flow
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Req() req, @Res() res)
  {
      // handles the Google OAuth2 callback
      const jwt: string = req.user.jwt;
      if (jwt)
          res.redirect('http://localhost:4200/login/succes/' + jwt);
      else 
          res.redirect('http://localhost:4200/login/failure');
  }

}
