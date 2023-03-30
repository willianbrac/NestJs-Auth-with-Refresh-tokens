import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from 'src/app/users/entities/user.entity';
import { ValidateUserService } from '../services/validate-user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private validateUserService: ValidateUserService) {
    super();
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.validateUserService.execute(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    return user;
  }
}
