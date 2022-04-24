import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TasksStatus } from '../enum/status.enum';

@Entity('tasks')
export class Tasks {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TasksStatus;


  @ManyToOne(_type => User, user=> user.tasks, {eager: false })
  @Exclude({toPlainOnly: true})
  user: User;
}
