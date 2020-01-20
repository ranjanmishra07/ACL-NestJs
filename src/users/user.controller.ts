import { Controller, Get, Post, Body, UsePipes, ValidationPipe, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto, LoginUserDto, TestDto } from './user-dto.';
import { User, UserRole } from './user.entity';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiHeader } from '@nestjs/swagger';
import { Roles } from './decorators/get-roles.decorator';
import { RolesGuard } from './roles/roles.guard';
import { GetUser } from './decorators/get-user.decorator';

@Controller('User')
@ApiHeader({
  name: 'Authorization',
  description: 'Auth token',
})
export class UserController {
  constructor(private readonly Userervice: UserService){}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  async findAllUser(@GetUser() user: User): Promise<User[]> {
    // const roleAcess = await this.roleService.checkAccess(user.role);
    const result =  await this.Userervice.findAllUser();
    return result;
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  @UsePipes(new ValidationPipe())
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.Userervice.createUser(createUserDto);
  }


  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERUSER)
  @Get('/profile')
  getProfile(@GetUser() user: User) {
    return user;
  }

  @Post('test')
  @UsePipes(new ValidationPipe())
  getCustomUser(@Body() testDto: TestDto) {
    return testDto;
  }
}
