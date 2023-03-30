import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { DeleteRefreshTokenService } from './delete-refresh-token.service';
import { GenerateRefreshTokenService } from './generate-refresh-token.service';
import { GenerateAccessTokenService } from './gerate-access-token.service';
import { GetUserFromRefreshTokenService } from './get-user-from-refresh-token.service';
import { ValidateRefreshTokenService } from './validate-refresh-token.service';

@Injectable()
export class GenerateTokenFromRefreshTokenService {
  constructor(
    private readonly validateRefreshToken: ValidateRefreshTokenService,
    private readonly getUserFromRefreshToken: GetUserFromRefreshTokenService,
    private readonly deleteRefreshToken: DeleteRefreshTokenService,
    private readonly generateAccessToken: GenerateAccessTokenService,
    private readonly generateRefreshToken: GenerateRefreshTokenService,
  ) {}
  async execute(token: string) {
    const isValid = await this.validateRefreshToken.execute(token);

    if (isValid) {
      const user = await this.getUserFromRefreshToken.execute(token);

      if (!user)
        throw new UnauthorizedException('User not found for refresh token');

      await this.deleteRefreshToken.execute(token);

      const accessToken = await this.generateAccessToken.execute(user);

      const newRefreshToken = await this.generateRefreshToken.execute(user);

      const expiresIn = 3600;

      return { accessToken, expiresIn, refreshToken: newRefreshToken };
    } else {
      throw new BadRequestException('Refresh token inválido ou expirado');
    }
  }
}
