import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}
  @Post('/signup')
  async signUp(@Body() body: AuthCredentialsDto): Promise<void> {
    return this.service.signUp(body);
  }
  @Post('/signin')
  async signIn(@Body() body: AuthCredentialsDto): Promise<{accessToken: string}> {
    return this.service.signIn(body);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log(req)
  }
}
