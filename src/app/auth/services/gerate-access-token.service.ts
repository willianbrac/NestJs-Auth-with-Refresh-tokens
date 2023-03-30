import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/app/users/entities/user.entity';

@Injectable()
export class GenerateAccessTokenService {
  constructor(private readonly jwtService: JwtService) {}
  async execute(user: User) {
    const payload = { userId: user.id };
    return this.jwtService.signAsync(payload, { expiresIn: '1h' });
  }
}
