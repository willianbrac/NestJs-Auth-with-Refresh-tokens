import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { LoginDto } from './dtos/auth-login.dto';
import { IAuthRepository } from './repositories/IAuthRepository';
import { hashSync } from 'bcrypt';
import { User } from '@prisma/client';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { RefreshToken } from './entities/refreshToken.entity';
import {
  InvalidCredentials,
  InvalidOrExpiredRefreshToken,
  TokenNotFound,
  UserNotFoundOnRefreshToken,
  WrongEmailPassword,
} from './errors/auth.errors';

interface validatePasswordParams {
  userPassword: string;
  userSalt: string;
  inputPassword: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: IAuthRepository,
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => UserService))
    private readonly usersService: UserService,
  ) {}

  async login(data: LoginDto) {
    const authenticatedUser = await this.validateUser(
      data.email,
      data.password,
    );
    if (!authenticatedUser) throw new WrongEmailPassword();
    const accessToken = await this.generateAccessToken(authenticatedUser);
    const refreshToken = await this.generateRefreshToken(authenticatedUser);
    const expiresIn = 3600;
    return { accessToken, expiresIn, refreshToken };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    if (
      !user ||
      !(await this.validatePassword({
        userPassword: user.password,
        userSalt: user.salt,
        inputPassword: password,
      }))
    ) {
      throw new InvalidCredentials();
    }
    return user;
  }

  private async validatePassword(
    data: validatePasswordParams,
  ): Promise<boolean> {
    return data.userPassword === hashSync(data.inputPassword, data.userSalt);
  }

  private async generateRefreshToken(user: User) {
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

  async deleteRefreshToken(token: string): Promise<void> {
    const refreshToken = await this.findRefreshToken(token);
    await this.authRepository.deleteRefreshToken(refreshToken.id);
  }

  private async generateAccessToken(user: User) {
    const payload = { userId: user.id };
    return this.jwtService.signAsync(payload, { expiresIn: '1h' });
  }

  private async validateRefreshToken(token: string): Promise<boolean> {
    const refreshToken = await this.findRefreshToken(token);
    const user = await this.usersService.findById(refreshToken.userId);
    if (refreshToken && user && refreshToken.expiresIn > new Date()) {
      return true;
    }
    return false;
  }

  private async getUserFromRefreshToken(token: string): Promise<User> {
    const refreshToken = await this.findRefreshToken(token);
    const user = await this.usersService.findById(refreshToken.userId);
    if (!user) throw new TokenNotFound();
    return user;
  }

  async generateTokenFromRefreshToken(token: string) {
    const isValid = await this.validateRefreshToken(token);
    if (isValid) {
      const user = await this.getUserFromRefreshToken(token);
      if (!user) throw new UserNotFoundOnRefreshToken();
      await this.deleteRefreshToken(token);
      const accessToken = await this.generateAccessToken(user);
      const newRefreshToken = await this.generateRefreshToken(user);
      const expiresIn = 3600;
      return { accessToken, expiresIn, refreshToken: newRefreshToken };
    } else {
      throw new InvalidOrExpiredRefreshToken();
    }
  }

  private async findRefreshToken(token: string): Promise<RefreshToken> {
    const refreshToken = await this.authRepository.findRefreshToken(token);
    if (!refreshToken) throw new TokenNotFound();
    return refreshToken;
  }
}
