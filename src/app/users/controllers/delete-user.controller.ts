import { Controller, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { DeleteUserService } from '../services/delete-user.service';

@Controller('users')
export class DeleteUserController {
  constructor(private readonly service: DeleteUserService) {}
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.execute(id);
  }
}
