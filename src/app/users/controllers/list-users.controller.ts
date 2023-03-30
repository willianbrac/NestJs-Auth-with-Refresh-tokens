import { Controller, Get } from '@nestjs/common';
import { ListUsersService } from '../services/list-users.service';

@Controller('users')
export class ListUsersController {
  constructor(private readonly service: ListUsersService) {}
  @Get()
  findAll() {
    return this.service.execute();
  }
}
