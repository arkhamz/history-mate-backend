import { Module } from '@nestjs/common';
import { UserBattlesService } from './userBattles.service';
import { UserBattlesController } from './userBattles.controller';

@Module({
  imports: [],
  controllers: [UserBattlesController],
  providers: [UserBattlesService],
})
export class UserBattlesModule {}
