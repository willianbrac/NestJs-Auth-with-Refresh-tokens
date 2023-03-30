import { Injectable } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../entities/user.entity';
import { IUsersRepository } from './IUsersRepository';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    const salt = await genSalt();
    const hashedPassword = await hash(data.password, salt);
    const user = await this.prisma.user.create({
      data: {
        username: data.userName,
        email: data.email,
        password: hashedPassword,
        salt,
      },
    });
    return user;
  }

  async list(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findById(userId: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findUsername(username: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { username },
    });
  }

  async update(userId: string, data: UpdateUserDto): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: data,
    });
  }

  async delete(userId: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id: userId },
    });
  }
}
