import { Controller, Request, Post, UseGuards, Body, Get, Req, Res, HttpException, HttpStatus } from '@nestjs/common';
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
  googleLoginCallback(@Req() req)
  {
      // handles the Google OAuth2 callback
      // console.log('hitting here')
      const result = req.user.payload;
      if (result) {
        return result;
       } else {
         throw new HttpException('error while signing in', HttpStatus.SERVICE_UNAVAILABLE);
       }
          // res.redirect('http://localhost:4200/login/failure');
  }

}
