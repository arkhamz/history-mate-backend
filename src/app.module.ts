import { Module } from '@nestjs/common';
import { BattlesModule } from './modules/battles/battles.module';
import { UsersModule } from './modules/users/users.module';
import { CommandersModule } from './modules/commanders/commanders.module';
import { DrizzleModule } from './modules/drizzle/drizzle.module';
import { UserBattlesModule } from './modules/userBattles/userBattles.module';
import { AuthModule } from './modules/auth/auth.module';
import { QuestionAnswersModule } from './modules/questionAnswers/questionAnswers.module';

@Module({
  imports: [
    BattlesModule,
    UsersModule,
    CommandersModule,
    DrizzleModule,
    UserBattlesModule,
    AuthModule,
    QuestionAnswersModule,
  ],
})
export class AppModule {}
