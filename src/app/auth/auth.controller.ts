import { Controller, Post, Body, Req, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/auth-login.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetLoggedUser } from './decorators/get-logged-user.decorator';
import { User } from '../users/entities/user.entity';
import { GetUserDto } from '../users/dtos/user.get.dto';

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

  @Get()
  @UseGuards(AuthGuard())
  public getSignedUserInfo(@GetLoggedUser() user: User): GetUserDto {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
    };
  }
}
