import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateRefreshTokenDto } from '../dtos/create-refresh-token.dto';
import { RefreshToken } from '../entities/refreshToken.entity';
import { IAuthRepository } from './IAuthRepository';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createRefreshToken(data: CreateRefreshTokenDto) {
    return await this.prisma.refresh_token.create({
      data: {
        token: data.token,
        userId: data.userId,
        expiresIn: data.expiresIn,
      },
    });
  }

  async findRefreshToken(token: string): Promise<RefreshToken> {
    return await this.prisma.refresh_token.findFirst({
      where: { token },
    });
  }

  async deleteRefreshToken(tokenId: string): Promise<void> {
    await this.prisma.refresh_token.delete({
      where: { id: tokenId },
    });
  }
}
