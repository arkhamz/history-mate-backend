import { Controller, Get, Param } from '@nestjs/common';
import { CommandersService } from './commanders.service';
import { CommanderInferred } from 'src/types';

@Controller('commanders')
export class CommandersController {
  constructor(private readonly commandersService: CommandersService) {}

  @Get()
  async findAll(): Promise<CommanderInferred[] | undefined> {
    return await this.commandersService.getAllCommanders();
  }

  @Get(':id')
  async findOne(
    @Param('id') id: number,
  ): Promise<CommanderInferred | undefined> {
    return await this.commandersService.getCommander(id);
  }
}
