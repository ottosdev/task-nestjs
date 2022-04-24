import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTasksDTO {
  @IsString()
  @IsNotEmpty({message: "Titulo não pode ser vazio"})
  title: string;

  @IsNotEmpty({message: "Descrição não pode ser vazio"})
  description: string;
}
