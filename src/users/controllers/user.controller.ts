import { Controller, Get, Post, Body, UsePipes, ValidationPipe, Request, UseGuards, HttpException, HttpStatus, Param } from '@nestjs/common';
import { CreateUserDto, LoginUserDto, TestDto, CreateUserRolesDto, CreateUserAccessDto, CreateUserPermissionsDto } from 'src/users/dto/user-dto';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiHeader } from '@nestjs/swagger';
import { Roles } from '../decorators/get-roles.decorator';
import { RolesGuard } from '../utils/roles.guard';
import { GetUser } from '../decorators/get-user.decorator';
import { RoleService } from '../services/role.service';
import { PermissionService } from '../services/permission.service';
import { UserPermissionService } from '../services/user-permissions.service';
import { UserRoleService } from '../services/user-roles.service';
import { UserAccessService } from '../services/user-access.service';
import { Auth } from '../decorators/authorize-api-routes';

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
    private readonly permissionService: PermissionService,
    private readonly userPermissionService: UserPermissionService,
    private readonly userRoleService: UserRoleService,
    private readonly userAccessService: UserAccessService,
  ) { }

  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get()
  async findAllUser(@GetUser() user: User): Promise<User[]> {
    // const roleAcess = await this.roleService.checkAccess(user.role);
    const result = await this.userService.findAllUser();
    return result;
  }

  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @Roles(UserRole.ADMIN)
  @Post()
  @UsePipes(new ValidationPipe())
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Post('/roles')
  @UsePipes(new ValidationPipe())
  async createUserRole(@Body() createUserRolesDto: CreateUserRolesDto) {
    let roleExists = false;
    roleExists = await this.permissionService.checkPermissionsIfExists(createUserRolesDto.roleIds);
    if (roleExists) {
      return await this.userRoleService.createUserRoles(createUserRolesDto);
    } else {
      return new HttpException('permission does not exist', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/permissions')
  @UsePipes(new ValidationPipe())
  async createUserPermission(@Body() createUserPermissionsDto: CreateUserPermissionsDto) {
    let permissionExists = false;
    permissionExists = await this.permissionService.checkPermissionsIfExists(createUserPermissionsDto.permissionIds);
    if (permissionExists) {
      return await this.userPermissionService.createUserPermissions(createUserPermissionsDto);
    } else {
      return new HttpException('permission does not exist', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/access')
  @UsePipes(new ValidationPipe())
  async createUserAccess(@Body() createUserAccessDto: CreateUserAccessDto) {
    return await this.userAccessService.createUserAccess(createUserAccessDto);
  }

  @Get('permissions')
  @UsePipes(new ValidationPipe())
  async getUserPermissions(@GetUser() user: User) {
    if (user) {
      return await this.userPermissionService.getUserPermissions(user);
    } else {
      throw new HttpException('no user', HttpStatus.NOT_FOUND);
    }
  }

  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @Roles(UserRole.ADMIN, UserRole.SUPERUSER)
  @Auth(['admin'], 'P-CODE')
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
