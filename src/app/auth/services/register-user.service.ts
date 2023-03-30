import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/app/users/dtos/create-user.dto';
import { User } from 'src/app/users/entities/user.entity';
import { CreateUserService } from 'src/app/users/services/create-user.service';

@Injectable()
export class RegisterUserService {
  constructor(private readonly createUser: CreateUserService) {}
  async execute(data: CreateUserDto): Promise<User> {
    return await this.createUser.execute(data);
  }
}
