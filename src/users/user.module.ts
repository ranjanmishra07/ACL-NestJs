import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Role } from './entities/role.entity';
import {UserRole} from './entities/user-roles.entity';
import { UserPermissions } from './entities/user-permission.entity';
import { UserAccess } from './entities/user-access.entity';
import { RoleService } from './services/role.service';
import { UserRoleService } from './services/user-roles.service';
import { PermissionService } from './services/permission.service';
import { Permission } from './entities/permission.entity';
import { RoleController } from './controllers/role.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, UserRole, UserPermissions, UserAccess, UserPermissions, UserRole,Permission]), forwardRef(() => AuthModule) ],
  controllers: [UserController,RoleController],
  providers: [UserService, RoleService, UserRoleService,PermissionService],
  exports: [UserService, RoleService],
})
export class UserModule  {
  
}
