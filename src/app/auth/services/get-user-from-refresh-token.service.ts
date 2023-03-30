import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/app/users/entities/user.entity';
import { FindByUserIdService } from 'src/app/users/services/find-by-id.service';
import { IAuthRepository } from '../repositories/IAuthRepository';

@Injectable()
export class GetUserFromRefreshTokenService {
  constructor(
    private readonly authRepository: IAuthRepository,
    private readonly findByUserIdService: FindByUserIdService,
  ) {}
  async execute(token: string): Promise<User> {
    const refreshToken = await this.authRepository.findRefreshToken(token);
    const user = await this.findByUserIdService.execute(refreshToken.userId);
    if (!user) throw new BadRequestException('Token not found!');
    return user;
  }
}
