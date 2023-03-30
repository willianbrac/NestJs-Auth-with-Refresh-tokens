import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { IUsersRepository } from '../repositories/IUserRepository';
import { UserNotFound } from './errors/user.errors';

@Injectable()
export class FindByUsernameService {
  constructor(private readonly usersRepository: IUsersRepository) {}
  async execute(username: string): Promise<User> {
    const user = await this.usersRepository.findUsername(username);
    if (!user) throw new UserNotFound();
    return user;
  }
}
