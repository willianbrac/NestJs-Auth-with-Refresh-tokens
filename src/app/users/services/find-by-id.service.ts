import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { UserNotFound } from './errors/user.errors';

@Injectable()
export class FindByUserIdService {
  constructor(private readonly usersRepository: IUsersRepository) {}
  async execute(userId: string): Promise<User> {
    const user = await this.usersRepository.findById(userId);
    if (!user) throw new UserNotFound();
    return user;
  }
}
