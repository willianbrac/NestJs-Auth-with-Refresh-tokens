import { Controller, Post, Req } from '@nestjs/common';
import { DeleteRefreshTokenService } from '../services/delete-refresh-token.service';

@Controller('auth')
export class LogoutController {
  constructor(private readonly service: DeleteRefreshTokenService) {}
  @Post('logout')
  async logout(@Req() req): Promise<void> {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.replace(/^Bearer\s+/, '');
    await this.service.execute(token);
  }
}
