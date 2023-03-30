import { Controller, Post, Body, Req } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/register')
  register(@Body() req: CreateUserDto) {
    return this.authService.register(req);
  }

  @Post('login')
  async login(@Body() req: LoginDto) {
    return await this.authService.login(req);
  }

  @Post('refresh')
  async refresh(@Req() req) {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.replace(/^Bearer\s+/, '');
    return await this.authService.generateTokenFromRefreshToken(token);
  }

  @Post('logout')
  async logout(@Req() req): Promise<void> {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.replace(/^Bearer\s+/, '');
    await this.authService.deleteRefreshToken(token);
  }
}
