import { Injectable } from '@nestjs/common';
import { IAuthRepository } from '../repositories/IAuthRepository';

@Injectable()
export class DeleteRefreshTokenService {
  constructor(private readonly authRepository: IAuthRepository) {}
  async execute(token: string): Promise<void> {
    const refreshToken = await this.authRepository.findRefreshToken(token);
    if (refreshToken)
      await this.authRepository.deleteRefreshToken(refreshToken.id);
  }
}
