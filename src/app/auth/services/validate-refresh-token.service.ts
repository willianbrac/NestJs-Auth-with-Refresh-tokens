import { Injectable } from '@nestjs/common';
import { FindByUserIdService } from 'src/app/users/services/find-by-id.service';
import { IAuthRepository } from '../repositories/IAuthRepository';

@Injectable()
export class ValidateRefreshTokenService {
  constructor(
    private readonly findByUserIdService: FindByUserIdService,
    private readonly authRepository: IAuthRepository,
  ) {}
  async execute(token: string): Promise<boolean> {
    const refreshToken = await this.authRepository.findRefreshToken(token);
    const user = await this.findByUserIdService.execute(refreshToken.userId);
    if (refreshToken && user && refreshToken.expiresIn > new Date()) {
      return true;
    }
    return false;
  }
}
