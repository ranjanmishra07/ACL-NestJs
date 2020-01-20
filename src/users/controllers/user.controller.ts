import { Controller, Get, Post, Body, UsePipes, ValidationPipe, Request, UseGuards, HttpException } from '@nestjs/common';
import { CreateUserDto, LoginUserDto, TestDto } from '../dto/user-dto.';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiHeader } from '@nestjs/swagger';
import { Roles } from '../decorators/get-roles.decorator';
import { RolesGuard } from '../utils/roles.guard';
import { GetUser } from '../decorators/get-user.decorator';
import { RoleService } from '../services/role.service';

@Controller('user')
// @UseGuards(AuthGuard('jwt'))
@ApiHeader({
  name: 'Authorization',
  description: 'Auth token',
})
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    ){}

  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get()
  async findAllUser(@GetUser() user: User): Promise<User[]> {
    // const roleAcess = await this.roleService.checkAccess(user.role);
    const result =  await this.userService.findAllUser();
    return result;
  }

  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @Roles(UserRole.ADMIN)
  @Post()
  @UsePipes(new ValidationPipe())
  async createUser(@Body() createUserDto: CreateUserDto) {
    let roleExists = false;
    const createUserParams = [];
    const roleIdsExist = createUserDto.roleIds && createUserDto.roleIds.length > 0;
    if (roleIdsExist) {
      roleExists = await this.roleService.checkRoleIfExists(createUserDto.roleIds);
      if (roleExists) {
        createUserParams.push('roles');
      } else {
        return new HttpException('role doest not exist', 400);
      }
    }
    return await this.userService.createUser(createUserDto, createUserParams);
  }

  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @Roles(UserRole.ADMIN, UserRole.SUPERUSER)
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
