import { CreateRefreshTokenDto } from '../dtos/create-refresh-token.dto';
import { RefreshToken } from '../entities/refreshToken.entity';

export abstract class IAuthRepository {
  abstract createRefreshToken(data: CreateRefreshTokenDto);
  abstract findRefreshToken(token: string): Promise<RefreshToken>;
  abstract deleteRefreshToken(tokenId: string): Promise<void>;
}
