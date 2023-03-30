import { Injectable } from '@nestjs/common';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { UserNotFound } from './errors/user.errors';

@Injectable()
export class DeleteUserService {
  constructor(private readonly usersRepository: IUsersRepository) {}
  async execute(userId: string): Promise<void> {
    const user = await this.usersRepository.findById(userId);
    if (!user) throw new UserNotFound();
    await this.usersRepository.delete(userId);
  }
}
