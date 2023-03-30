import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { IUsersRepository } from '../repositories/IUserRepository';
import { UserNotFound } from './errors/user.errors';

@Injectable()
export class FindByEmailService {
  constructor(private readonly usersRepository: IUsersRepository) {}
  async execute(email: string): Promise<User> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new UserNotFound();
    return user;
  }
}
