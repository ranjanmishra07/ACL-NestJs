import { Module, forwardRef, OnModuleInit } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Role } from './roles/role.entity';
import {UserRole} from './roles/user-roles.entity';
import { PermissionService } from './permissions/permission.service';
import { Permission } from './permissions/permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, UserRole,Permission]), forwardRef(() => AuthModule) ],
  controllers: [UserController],
  providers: [UserService,PermissionService],
  exports: [UserService],
})
export class UserModule  {
  
}
