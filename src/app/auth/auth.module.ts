import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { authConfig } from './config/auth.config';
import { LoginController } from './controllers/login.controller';
import { LogoutController } from './controllers/logout.controller';
import { RefreshTokenController } from './controllers/refresh-token.controller';
import { RegisterUserController } from './controllers/register-user.controller';
import { DeleteRefreshTokenService } from './services/delete-refresh-token.service';
import { GenerateRefreshTokenService } from './services/generate-refresh-token.service';
import { GenerateTokenFromRefreshTokenService } from './services/generate-token-from-refresh-token.service';
import { GenerateAccessTokenService } from './services/gerate-access-token.service';
import { GetUserFromRefreshTokenService } from './services/get-user-from-refresh-token.service';
import { LoginService } from './services/login.service';
import { RegisterUserService } from './services/register-user.service';
import { ValidateRefreshTokenService } from './services/validate-refresh-token.service';
import { ValidateUserService } from './services/validate-user.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { RefreshStrategy } from './strategies/refresh.strategy';

@Module({
  imports: [ConfigModule, PassportModule, JwtModule.registerAsync(authConfig)],
  controllers: [
    LoginController,
    LogoutController,
    RefreshTokenController,
    RegisterUserController,
  ],
  providers: [
    JwtStrategy,
    LocalStrategy,
    RefreshStrategy,
    ValidateUserService,
    ValidateRefreshTokenService,
    RegisterUserService,
    LoginService,
    GetUserFromRefreshTokenService,
    GenerateAccessTokenService,
    GenerateTokenFromRefreshTokenService,
    GenerateRefreshTokenService,
    DeleteRefreshTokenService,
  ],
  exports: [
    LocalStrategy,
    JwtStrategy,
    RefreshStrategy,
    JwtStrategy,
    LocalStrategy,
    RefreshStrategy,
    ValidateUserService,
    ValidateRefreshTokenService,
    RegisterUserService,
    LoginService,
    GetUserFromRefreshTokenService,
    GenerateAccessTokenService,
    GenerateTokenFromRefreshTokenService,
    GenerateRefreshTokenService,
    DeleteRefreshTokenService,
  ],
})
export class AuthModule {}
