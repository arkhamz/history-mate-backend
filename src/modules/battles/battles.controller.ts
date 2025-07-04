import { Controller, Get, Param } from '@nestjs/common';
import { BattlesService } from './battles.service';

@Controller('battles')
export class BattlesController {
  constructor(private readonly battlesService: BattlesService) {}

  //implement an  auth middleware

  @Get()
  async findAll() {
    const allBattles = await this.battlesService.getAllBattles();
    return allBattles;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const battle = await this.battlesService.getBattle(id);
    return battle;
  }
}
