import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { IUsersRepository } from '../repositories/IUserRepository';

@Injectable()
export class ListUsersService {
  constructor(private readonly usersRepository: IUsersRepository) {}
  async execute(): Promise<User[]> {
    return await this.usersRepository.list();
  }
}
