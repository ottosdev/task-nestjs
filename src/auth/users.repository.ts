import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth.dto';
import { User } from './user.entity';
import { genSalt, hash } from 'bcrypt';
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(dto: AuthCredentialsDto): Promise<void> {
    const { username, password } = dto;

    // salts
    // senha + saltos de senhas
    const salt = await genSalt();
    const encryptPassword = await hash(password, salt);

    const user = this.create({ username, password: encryptPassword });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
