import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTasksDTO } from './dtos/create-task.dto';
import { GetTasksFiterDTO } from './dtos/filter-tasks.dto';
import { UpdateTaskDTO } from './dtos/update-task.dto';
import { Tasks } from './entity/tasks.entity';

import { TasksService } from './tasks.service';

/**
 *
 * tasks -> nome, descricao, data
 *
 */

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private readonly service: TasksService) {}

  // // http://localhost:3000/tasks
  // @Get()
  // getTasks(@Query() filterDto: GetTasksFiterDTO): Tasks[] {
  //   /**
  //    *  If we have any filters defined, call service.getTaskFilter()
  //    *  otherwise, just get all tasks
  //    *
  //    *
  //    */

  //   if (Object.keys(filterDto).length) {
  //     return this.service.getTasksWithFilter(filterDto);
  //   } else {
  //     return this.service.getAllTasks();
  //   }
  // }

  @Get()
  getAllTasks(@Query() filterDto: GetTasksFiterDTO, @GetUser() user: User): Promise<Tasks[]> {
    return this.service.getTasks(filterDto, user);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string,  @GetUser() user: User): Promise<Tasks> {
    return this.service.getTaskById(id, user);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.service.delete(id, user);
  }

  //DTO
  @Post()
  create(@Body() dto: CreateTasksDTO, @GetUser() user: User): Promise<Tasks> {
    return this.service.create(dto, user);
  }

  @Patch(':id/status')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateTaskDTO,
    @GetUser() user: User
  ): Promise<Tasks> {
    const { status } = dto;
    return this.service.update(id, status, user);
  }
}
