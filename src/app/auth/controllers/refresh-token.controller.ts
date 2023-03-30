import { Controller, Post, Req } from '@nestjs/common';
import { GenerateTokenFromRefreshTokenService } from '../services/generate-token-from-refresh-token.service';

@Controller('auth')
export class RefreshTokenController {
  constructor(private readonly service: GenerateTokenFromRefreshTokenService) {}
  @Post('refresh')
  async refresh(@Req() req) {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.replace(/^Bearer\s+/, '');
    return await this.service.execute(token);
  }
}
