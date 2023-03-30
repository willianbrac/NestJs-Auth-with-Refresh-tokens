import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entities/user.entity';
import { IUsersRepository } from '../repositories/IUserRepository';
import { UsernameOrEmailAlreadExists } from './errors/user.errors';

@Injectable()
export class CreateUserService {
  constructor(private readonly usersRepository: IUsersRepository) {}
  async execute(data: CreateUserDto): Promise<User> {
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
}
