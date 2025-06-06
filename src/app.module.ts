import { Module } from '@nestjs/common';
import { BattlesController } from './modules/battles/battles.controller';
import { CommandersController } from './modules/commanders/commanders.controller';
import { ProgressController } from './modules/progress/progress.controller';
import { UsersController } from './modules/users/users.controller';
import { BattlesService } from './modules/battles/battles.service';
import { CommandersService } from './modules/commanders/commanders.service';
import { ProgressService } from './modules/progress/progress.service';
import { UsersService } from './modules/users/users.service';

@Module({
  imports: [],
  controllers: [
    BattlesController,
    CommandersController,
    ProgressController,
    UsersController,
  ],
  providers: [BattlesService, CommandersService, ProgressService, UsersService],
})
export class AppModule {}
