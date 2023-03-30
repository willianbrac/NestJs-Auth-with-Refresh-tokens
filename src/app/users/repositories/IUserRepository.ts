import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../entities/user.entity';

export abstract class IUsersRepository {
  abstract create(data: CreateUserDto): Promise<User>;
  abstract findById(userId: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findUsername(username: string): Promise<User | null>;
  abstract list(): Promise<User[]>;
  abstract delete(userId: string): Promise<void>;
  abstract update(userId: string, data: UpdateUserDto): Promise<void>;
}
