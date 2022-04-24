import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TaskRepository } from './repository/tasks.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

// Controller é definido nesse modulo, nossa classes de controllador de rotas
// providers é onde o service ira prover nesse modulo, ou seja, permitindo o serviço seja injetado
@Module({
  imports: [TypeOrmModule.forFeature([TaskRepository]), AuthModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
