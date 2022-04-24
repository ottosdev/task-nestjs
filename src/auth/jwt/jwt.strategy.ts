import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../user.entity';
import { UserRepository } from '../users.repository';
import { IJwtPayload } from './payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepo: UserRepository,
  ) {
    super({
      secretOrKey: 'secret',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payloads: IJwtPayload): Promise<User> {
    const { username } = payloads;
    const user: User = await this.userRepo.findOne({username});

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
