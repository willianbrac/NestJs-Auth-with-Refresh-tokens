import { BadRequestException, NotFoundException } from '@nestjs/common';

export class UserNotFound extends NotFoundException {
  constructor() {
    super('User not found!');
  }
}

export class UsernameOrEmailAlreadExists extends BadRequestException {
  constructor() {
    super('Username or email alread exists!');
  }
}
