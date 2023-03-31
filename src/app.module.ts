import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './app/auth/auth.module';
import { UsersModule } from './app/users/users.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    AuthModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
