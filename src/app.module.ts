import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksController } from './tasks/tasks.controller';
import { TasksService } from './tasks/tasks.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmPostgreConfig } from './config/typeorm.config';
import { typeOrmMongoConfig } from './config/typeorm.config';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import {CacheModule} from './cache/cache.module';

@Module({
  imports: [CacheModule, TypeOrmModule.forRoot(typeOrmPostgreConfig), TypeOrmModule.forRoot(typeOrmMongoConfig),
    TasksModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
