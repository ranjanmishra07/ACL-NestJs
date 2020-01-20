import { Module, OnModuleInit, OnApplicationBootstrap } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksController } from './tasks/tasks.controller';
import { TasksService } from './tasks/tasks.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { UserPermissions } from './users/permissions/user-permission.entity';
import { Permission } from './users/permissions/permission.entity';
import { PermissionService } from './users/permissions/permission.service';
import { permissionListArry } from './permission-list/permission-list';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), TasksModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule{
 
}
