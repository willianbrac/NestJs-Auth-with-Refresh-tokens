import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from 'src/database/database.module';
import { authConfig } from './config/auth.config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync(authConfig),
    DatabaseModule,
    forwardRef(() => UsersModule),
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService],
  exports: [JwtStrategy, AuthService],
})
export class AuthModule {}
