/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { hashSync } from 'bcrypt';
import { User } from 'src/app/users/entities/user.entity';
import { FindByEmailService } from 'src/app/users/services/find-by-email.service';

@Injectable()
export class ValidateUserService {
  constructor(private readonly findByEmailService: FindByEmailService) {}
  
  async execute(email: string, password: string): Promise<User> {
    const user = await this.findByEmailService.execute(email);

    if (!user || !(await this.validatePassword(user.password, user.salt, password))) {
      throw new UnauthorizedException('Invalid credentials!');
    }
    return user;
  }

  private async validatePassword(userPassword: string, userSalt: string, inputPassword: string): Promise<boolean> {
    return userPassword === hashSync(inputPassword, userSalt);
  }
}
