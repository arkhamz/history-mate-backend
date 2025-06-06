import { Module } from '@nestjs/common';
import { CommandersController } from './commanders.controller';
import { CommandersService } from './commanders.service';

@Module({
  imports: [],
  controllers: [CommandersController],
  providers: [CommandersService],
})
export class CommandersModule {}
