import { Module } from '@nestjs/common';
import { BattlesModule } from './modules/battles/battles.module';
import { UsersModule } from './modules/users/users.module';
import { CommandersModule } from './modules/commanders/commanders.module';
import { DrizzleModule } from './modules/drizzle/drizzle.module';
import { UserToBattlesModule } from './modules/userToBattles/userToBattles.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    BattlesModule,
    UsersModule,
    CommandersModule,
    DrizzleModule,
    UserToBattlesModule,
    AuthModule,
  ],
})
export class AppModule {}
