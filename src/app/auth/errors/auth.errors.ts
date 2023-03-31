import { BadRequestException, UnauthorizedException } from '@nestjs/common';

export class TokenNotFound extends BadRequestException {
  constructor() {
    super('Token not found');
  }
}

export class WrongEmailPassword extends BadRequestException {
  constructor() {
    super('Wrong email password!');
  }
}

export class InvalidCredentials extends UnauthorizedException {
  constructor() {
    super('Invalid credentials');
  }
}

export class UserNotFoundOnRefreshToken extends UnauthorizedException {
  constructor() {
    super('User not found on refresh token!');
  }
}

export class InvalidOrExpiredRefreshToken extends BadRequestException {
  constructor() {
    super('Invalid or expired refresh token');
  }
}
