import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TasksStatus } from '../enum/status.enum';


export class GetTasksFiterDTO {
  @IsOptional()
  @IsEnum(TasksStatus)
  statu?: TasksStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
