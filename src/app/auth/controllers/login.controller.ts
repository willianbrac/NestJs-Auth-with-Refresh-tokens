import { Controller, Post, Body } from '@nestjs/common';
import { LoginDto } from '../dtos/auth-login.dto';
import { LoginService } from '../services/login.service';

@Controller('auth')
export class LoginController {
  constructor(private readonly service: LoginService) {}
  @Post('login')
  async login(@Body() body: LoginDto) {
    return await this.service.execute(body);
  }
}
