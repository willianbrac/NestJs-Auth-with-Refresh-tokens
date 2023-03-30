import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from '../dtos/auth-login.dto';
import { GenerateRefreshTokenService } from './generate-refresh-token.service';
import { GenerateAccessTokenService } from './gerate-access-token.service';
import { ValidateUserService } from './validate-user.service';

@Injectable()
export class LoginService {
  constructor(
    private readonly validateUser: ValidateUserService,
    private readonly generateAccessToken: GenerateAccessTokenService,
    private readonly generateRefreshToken: GenerateRefreshTokenService,
  ) {}
  async execute(data: LoginDto) {
    const authenticatedUser = await this.validateUser.execute(
      data.email,
      data.password,
    );
    if (!authenticatedUser) {
      throw new BadRequestException('Usuário e/ou senha inválidos');
    }
    const accessToken = await this.generateAccessToken.execute(
      authenticatedUser,
    );
    const refreshToken = await this.generateRefreshToken.execute(
      authenticatedUser,
    );
    const expiresIn = 3600;
    return { accessToken, expiresIn, refreshToken };
  }
}
