import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from 'src/app/users/dtos/create-user.dto';
import { RegisterUserService } from '../services/register-user.service';

@Controller('auth')
export class RegisterUserController {
  constructor(private readonly service: RegisterUserService) {}
  @Post('/register')
  register(@Body() body: CreateUserDto) {
    return this.service.execute(body);
  }
}
