import { Controller, Get, Post, Body, UsePipes, ValidationPipe, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './user-dto.';
import { Users, UserRole } from './users.entity';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiHeader } from '@nestjs/swagger';
import { Roles } from './decorators/get-roles.decorator';
import { RolesGuard } from './roles/roles.guard';
import { GetUser } from './decorators/get-user.decorator';

@Controller('users')
@ApiHeader({
  name: 'Authorization',
  description: 'Auth token',
})
export class UsersController {
  constructor (private readonly userService: UsersService){}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  async findAllUser(): Promise<Users[]> {
    const result =  await this.userService.findAllUser();
    return result;
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  @UsePipes(new ValidationPipe())
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }


  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERUSER)
  @Get('/profile')
  getProfile(@GetUser() user: Users) {
    return user;
  }
}
