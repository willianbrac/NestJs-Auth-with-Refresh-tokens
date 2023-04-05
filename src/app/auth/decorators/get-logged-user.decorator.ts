import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/app/users/entities/user.entity';

export const GetLoggedUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
