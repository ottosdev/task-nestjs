import { IsEnum } from 'class-validator';
import { TasksStatus } from '../enum/status.enum';

export class UpdateTaskDTO {
  @IsEnum(TasksStatus)
  status: TasksStatus;
}
