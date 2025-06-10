import { Module } from '@nestjs/common';
import { BattlesModule } from './modules/battles/battles.module';
import { UsersModule } from './modules/users/users.module';
import { CommandersModule } from './modules/commanders/commanders.module';
import { DrizzleModule } from './modules/drizzle/drizzle.module';

@Module({
  imports: [BattlesModule, UsersModule, CommandersModule, DrizzleModule],
})
export class AppModule {}
