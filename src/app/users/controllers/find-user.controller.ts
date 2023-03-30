import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { FindByUserIdService } from '../services/find-by-id.service';

@Controller('users')
export class FindUserController {
  constructor(private readonly service: FindByUserIdService) {}
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.execute(id);
  }
}
