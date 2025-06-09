import { Module } from '@nestjs/common';
import { BattlesController } from './modules/battles/battles.controller';
import { CommandersController } from './modules/commanders/commanders.controller';
import { ProgressController } from './modules/progress/progress.controller';
import { UsersController } from './modules/users/users.controller';
import { BattlesService } from './modules/battles/battles.service';
import { CommandersService } from './modules/commanders/commanders.service';
import { ProgressService } from './modules/progress/progress.service';
import { UsersService } from './modules/users/users.service';
import { BattlesModule } from './modules/battles/battles.module';
import { UsersModule } from './modules/users/users.module';
import { CommandersModule } from './modules/commanders/commanders.module';
import { ProgressModule } from './modules/progress/progress.module';
import { DrizzleModule } from './modules/drizzle/drizzle.module';

// @Module({
//   imports: [],
//   controllers: [
//     BattlesController,
//     CommandersController,
//     ProgressController,
//     UsersController,
//   ],
//   providers: [BattlesService, CommandersService, ProgressService, UsersService],
// })
@Module({
  imports: [
    BattlesModule,
    UsersModule,
    CommandersModule,
    ProgressModule,
    DrizzleModule,
  ],
})
export class AppModule {}
