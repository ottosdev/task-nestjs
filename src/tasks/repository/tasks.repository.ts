import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTasksDTO } from '../dtos/create-task.dto';
import { GetTasksFiterDTO } from '../dtos/filter-tasks.dto';
import { Tasks } from '../entity/tasks.entity';
import { TasksStatus } from '../enum/status.enum';

@EntityRepository(Tasks)
export class TaskRepository extends Repository<Tasks> {
  async getTasks(filterDto: GetTasksFiterDTO, user:User): Promise<Tasks[]> {
    const { statu, search } = filterDto;

    const query = this.createQueryBuilder('task');
    query.where({user})

    if (statu) {
      query.andWhere('task.status = :status', { statu });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }
  async createTask(dto: CreateTasksDTO, user: User): Promise<Tasks> {
    const { title, description } = dto;

    const task = this.create({
      title,
      description,
      status: TasksStatus.OPEN,
      user
    });

    await this.save(task);

    return task;
  }
}
