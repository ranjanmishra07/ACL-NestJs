import { Controller, Get, Body, Post } from '@nestjs/common';
import { Task } from './tasks.entity';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './tasks-dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async findAll(): Promise<Task[]> {
    const result =  await this.tasksService.findAll();
    return result;
  }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    await this.tasksService.createTask(createTaskDto);
  }
}
