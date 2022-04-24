import { Tasks } from 'src/tasks/entity/tasks.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({unique: true})
  username: string;

  @Column()
  password: string;

  @OneToMany(_type => Tasks, tasks => tasks.user, {eager: true})
  tasks: Tasks[]
}
