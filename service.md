import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Tasks, TasksStatus } from './entity/tasks.entity';
import { v4 as uuidV4 } from 'uuid';
import { CreateTasksDTO } from './dtos/create-task.dto';
import { UpdateTaskDTO } from './dtos/update-task.dto';
import { GetTasksFiterDTO } from './dtos/filter-tasks.dto';
@Injectable()
export class TasksService {
  private tasks: Tasks[] = [];

  getAllTasks(): Tasks[] {
    return this.tasks;
  }

  getTaskById(id: string): Tasks {
    /**
     *
     * tente fazer alguma coisa
     *
     * se nao achar nada retorne um error
     *
     * se nao retorne a atividade
     *
     */

    try {
      const task = this.tasks.find((item) => item.id === id);
      if (!task) {
        throw new HttpException(
          'Tarefa não encontrada',
          HttpStatus.BAD_REQUEST,
        );
      }

      return task;
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException({ message: error.message }, error.getStatus());
      }

      throw new HttpException(
        'Alguma coisa de errada nao esta certa',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  deleteTasks(id: string): void {
    // procurando qual o index do array que eu informei pelo id

    try {
      const task = this.tasks.findIndex((item) => item.id === id);

      if (task === -1) {
        throw new HttpException(
          'Tarefa não encontrada',
          HttpStatus.BAD_REQUEST,
        );
      }

      this.tasks.splice(task, 1);
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException({ message: error.message }, error.getStatus());
      }

      throw new HttpException(
        'Alguma coisa de errada nao esta certa',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  createTasks(dto: CreateTasksDTO): Tasks {
    const { title, description } = dto;

    const newTasks = new Tasks();

    Object.assign(newTasks, {
      id: uuidV4(),
      title,
      description,
      status: TasksStatus.OPEN,
    });

    this.tasks.push(newTasks);

    return newTasks;
  }

  updateTasks(id: string, dto: UpdateTaskDTO): Tasks {
    const { status } = dto;
    const task = this.getTaskById(id);
    task.status = status;

    return task;
  }

  getTasksWithFilter(filterDto: GetTasksFiterDTO): Tasks[] {
    const { statu, search } = filterDto;

    let tasks = this.getAllTasks();

    if (statu) {
      tasks = tasks.filter((task) => task.status === statu);
    }
    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }

    return tasks;
  }
}
