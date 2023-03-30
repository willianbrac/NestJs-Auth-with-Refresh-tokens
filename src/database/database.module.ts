import { Module } from '@nestjs/common';
import { AuthRepository } from 'src/app/auth/repositories/authRepository';
import { IAuthRepository } from 'src/app/auth/repositories/IAuthRepository';
import { IUsersRepository } from 'src/app/users/repositories/IUsersRepository';
import { UsersRepository } from 'src/app/users/repositories/usersRepository';
import { PrismaService } from './prisma.service';

@Module({
  providers: [
    PrismaService,
    {
      provide: IUsersRepository,
      useClass: UsersRepository,
    },
    {
      provide: IAuthRepository,
      useClass: AuthRepository,
    },
  ],
  exports: [PrismaService, IUsersRepository, IAuthRepository],
})
export class DatabaseModule {}
