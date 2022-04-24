import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { AuthCredentialsDto } from './dto/auth.dto';
import { IJwtPayload } from './jwt/payload.interface';
import { UserRepository } from './users.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private repository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: AuthCredentialsDto): Promise<void> {
    return this.repository.createUser(dto);
  }

  async signIn(dto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const { username, password } = dto;

    const user = await this.repository.findOne({ username });
    const correctPassword = await compare(password, user.password);

    if (user && correctPassword) {
      const payload: IJwtPayload = { username };
      const accessToken = await this.jwtService.sign(payload);

      return {
        accessToken,
      };
    } else {
      throw new UnauthorizedException('Please check your login informations');
    }
  }
}
