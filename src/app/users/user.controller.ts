import {
  Controller,
  Param,
  Delete,
  ParseUUIDPipe,
  Get,
  Patch,
  Body,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  register(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Get()
  findAll() {
    return this.userService.list();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateUserDto,
  ) {
    return this.userService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.delete(id);
  }
}
