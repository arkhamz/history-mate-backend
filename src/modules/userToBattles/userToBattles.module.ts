import { Module } from '@nestjs/common';
import { UserToBattlesService } from './userToBattles.service';
import { UserToBattlesController } from './userToBattles.controller';

@Module({
  imports: [],
  controllers: [UserToBattlesController],
  providers: [UserToBattlesService],
})
export class UserToBattlesModule {}
