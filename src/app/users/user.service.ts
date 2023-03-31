import { Injectable } from '@nestjs/common';
import { IUsersRepository } from './repositories/IUsersRepository';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './entities/user.entity';
import {
  UserNotFound,
  UsernameOrEmailAlreadExists,
} from './errors/user.errors';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async create(data: CreateUserDto): Promise<User> {
    const emailAlreadExists = await this.usersRepository.findByEmail(
      data.email,
    );
    const usernameAlreadExists = await this.usersRepository.findUsername(
      data.userName,
    );
    if (emailAlreadExists || usernameAlreadExists) {
      throw new UsernameOrEmailAlreadExists();
    }
    return await this.usersRepository.create(data);
  }

  async list(): Promise<User[]> {
    return await this.usersRepository.list();
  }

  async update(userId: string, data: UpdateUserDto): Promise<void> {
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

  async delete(userId: string): Promise<void> {
    const user = await this.usersRepository.findById(userId);
    if (!user) throw new UserNotFound();
    await this.usersRepository.delete(userId);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new UserNotFound();
    return user;
  }

  async findById(userId: string): Promise<User> {
    const user = await this.usersRepository.findById(userId);
    if (!user) throw new UserNotFound();
    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.usersRepository.findUsername(username);
    if (!user) throw new UserNotFound();
    return user;
  }
}
