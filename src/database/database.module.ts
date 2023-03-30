import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaUsersRepository } from './prisma/repositories/PrismaUsersRepository';
import { IUsersRepository } from 'src/application/repositories/IUserRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: IUsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
  exports: [PrismaService, IUsersRepository],
})
export class DatabaseModule {}
