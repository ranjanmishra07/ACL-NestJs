import { Controller, Get, Post, Body, UsePipes, ValidationPipe, Request, UseGuards, HttpException, Param, ParseIntPipe, Query } from '@nestjs/common';
import { CreateUserDto, LoginUserDto, TestDto } from '../dto/user-dto';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiHeader } from '@nestjs/swagger';

import { GetUser } from '../decorators/get-user.decorator';
import { RoleService } from '../services/role.service';
import { UserRoleDTO, RolePermissionDTO } from '../dto/role.dto';

@Controller('role')
// @UseGuards(AuthGuard('jwt'))
@ApiHeader({
  name: 'Authorization',
  description: 'Auth token',
})
export class RoleController {
  constructor(
      private readonly roleService : RoleService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createRole(@Body() createRoleDto : UserRoleDTO):Promise<string> {
    return await this.roleService.createRoles(createRoleDto);
  }

  @Post('permissions')
  @UsePipes(new ValidationPipe())
  async createRolePermisions(@Body() rolePermissionDto:RolePermissionDTO) {
    return await this.roleService.createRolePermissions(rolePermissionDto);
  }

  @Get('permissions')
  async getRolePermissions(@Query('roleId', ParseIntPipe) roleId: number) {
    return await this.roleService.getRolePermissions(roleId);
  }

}
