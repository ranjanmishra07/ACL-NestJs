import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Role } from './roles/role.entity';
import {UserRole} from './roles/user-roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, UserRole]), forwardRef(() => AuthModule) ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
