import { Controller, Get } from '@nestjs/common';
import { CommandersService } from './commanders.service';

@Controller()
export class CommandersController {
  constructor(private readonly commandersService: CommandersService) {}

  @Get()
  getHello(): string {
    return this.commandersService.getHello();
  }
}
