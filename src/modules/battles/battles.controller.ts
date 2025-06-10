import { Controller, Get } from '@nestjs/common';
import { BattlesService } from './battles.service';

@Controller('battles')
export class BattlesController {
  constructor(private readonly battlesService: BattlesService) {}

  //implement a supabase auth middleware

  @Get()
  findAll(): string {
    return this.battlesService.getHello();
  }
}
