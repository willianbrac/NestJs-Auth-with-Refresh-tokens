import { Body, Controller, Param, ParseUUIDPipe, Patch } from '@nestjs/common';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UpdateUserService } from '../services/update-user.service';

@Controller('users')
export class UpdateUserController {
  constructor(private readonly service: UpdateUserService) {}
  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateUserDto,
  ) {
    return this.service.execute(id, body);
  }
}
