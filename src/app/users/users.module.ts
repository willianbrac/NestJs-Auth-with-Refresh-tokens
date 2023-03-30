import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { DeleteUserController } from './controllers/delete-user.controller';
import { FindUserController } from './controllers/find-user.controller';
import { ListUsersController } from './controllers/list-users.controller';
import { UpdateUserController } from './controllers/update-user.controller';
import { CreateUserService } from './services/create-user.service';
import { DeleteUserService } from './services/delete-user.service';
import { FindByEmailService } from './services/find-by-email.service';
import { FindByUserIdService } from './services/find-by-id.service';
import { FindByUsernameService } from './services/find-by-username.service';
import { ListUsersService } from './services/list-users.service';
import { UpdateUserService } from './services/update-user.service';

@Module({
  imports: [AuthModule, forwardRef(() => AuthModule)],
  controllers: [
    UpdateUserController,
    ListUsersController,
    FindUserController,
    DeleteUserController,
  ],
  providers: [
    CreateUserService,
    DeleteUserService,
    FindByEmailService,
    FindByUserIdService,
    FindByUsernameService,
    ListUsersService,
    UpdateUserService,
  ],
  exports: [
    CreateUserService,
    DeleteUserService,
    FindByEmailService,
    FindByUserIdService,
    FindByUsernameService,
    ListUsersService,
    UpdateUserService,
  ],
})
export class UsersModule {}
