import { Module, OnModuleInit, OnApplicationBootstrap } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksController } from './tasks/tasks.controller';
import { TasksService } from './tasks/tasks.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
// import { typeOrmMongoConfig } from './config/typeorm.config';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { UserPermissions } from './users/entities/user-permission.entity';
import { Permission } from './users/entities/permission.entity';
import { PermissionService } from './users/services/permission.service';
import { permissionListArry } from './permission-list/permission-list';


@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig),
    TasksModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule{
 
}
