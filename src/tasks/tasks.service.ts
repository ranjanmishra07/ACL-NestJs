import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './tasks-dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksReporitoty: Repository<Task>,
  ) {}
  async findAll(): Promise<Task[]> {
    const res = await this.tasksReporitoty.find();
    return res;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<{success: boolean}> {
    const res = await this.tasksReporitoty.insert(createTaskDto);
    if (res.identifiers) {
      console.log(res.identifiers, res.generatedMaps, res.raw);
      return {success: true};
    } else {
      return {success: false};
    }
  }
}
