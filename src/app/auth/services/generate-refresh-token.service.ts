import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/app/users/entities/user.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { IAuthRepository } from '../repositories/IAuthRepository';

@Injectable()
export class GenerateRefreshTokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authRepository: IAuthRepository,
  ) {}
  async execute(user: User) {
    const payload: JwtPayload = { userId: user.id, username: user.username };

    const token: string = await this.jwtService.signAsync(payload);

    const expiresIn = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 dias

    const refreshToken = await this.authRepository.createRefreshToken({
      token,
      userId: user.id,
      expiresIn,
    });

    return refreshToken.token;
  }
}
