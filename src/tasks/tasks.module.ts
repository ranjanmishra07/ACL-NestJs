import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { Task } from './tasks.entity';
import { TasksController } from './tasks.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
