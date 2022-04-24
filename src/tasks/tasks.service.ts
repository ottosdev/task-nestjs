import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateTasksDTO } from './dtos/create-task.dto';
import { GetTasksFiterDTO } from './dtos/filter-tasks.dto';
import { Tasks } from './entity/tasks.entity';
import { TasksStatus } from './enum/status.enum';
import { TaskRepository } from './repository/tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private repository: TaskRepository,
  ) {}

  async getTaskById(id: string, user: User): Promise<Tasks> {
    try {
      const task = await this.repository.findOne({ where: { id, user } });
      if (!task) {
        throw new HttpException('Task not found', HttpStatus.BAD_REQUEST);
      }

      return task;
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException({ message: error.message }, error.getStatus());
      }
      throw new HttpException(
        'Contact Suport',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(dto: CreateTasksDTO, user: User): Promise<Tasks> {
    return this.repository.createTask(dto, user);
  }

  async delete(id: string, user: User): Promise<void> {
    try {
      const result = await this.repository.delete({id, user});

      if (result.affected == 0) {
        throw new HttpException('Task doesnt exists!', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException({ message: error.message }, error.getStatus());
      }
      throw new HttpException(
        'Something wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, status: TasksStatus, user: User): Promise<Tasks> {
    const task = await this.getTaskById(id, user);
    task.status = status;

    await this.repository.save(task);

    return task;
  }

  getTasks(filterDto: GetTasksFiterDTO, user: User): Promise<Tasks[]> {
    return this.repository.getTasks(filterDto, user);
  }
}
