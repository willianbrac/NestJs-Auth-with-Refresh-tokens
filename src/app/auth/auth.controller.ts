import { Controller, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/auth-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() body: LoginDto) {
    return await this.authService.login(body);
  }

  @Post('logout')
  async logout(@Req() req): Promise<void> {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.replace(/^Bearer\s+/, '');
    await this.authService.deleteRefreshToken(token);
  }

  @Post('refresh')
  async refresh(@Req() req) {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.replace(/^Bearer\s+/, '');
    return await this.authService.generateTokenFromRefreshToken(token);
  }
}
