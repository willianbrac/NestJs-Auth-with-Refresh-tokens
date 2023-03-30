import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { IUsersRepository } from '../repositories/IUsersRepository';
import {
  UsernameOrEmailAlreadExists,
  UserNotFound,
} from './errors/user.errors';

@Injectable()
export class UpdateUserService {
  constructor(private readonly usersRepository: IUsersRepository) {}
  async execute(userId: string, data: UpdateUserDto): Promise<void> {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new UserNotFound();
    }
    const emailAlreadExists = await this.usersRepository.findByEmail(
      data.email,
    );
    const usernameAlreadExists = await this.usersRepository.findUsername(
      data.userName,
    );
    if (emailAlreadExists || usernameAlreadExists) {
      throw new UsernameOrEmailAlreadExists();
    }
    await this.usersRepository.update(userId, data);
  }
}
