import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { UserBattlesService } from './userBattles.service';
import { CreateUserBattlesDto, UpdateUserBattlesDto } from './userBattles.dtos';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('user-to-battles')
export class UserBattlesController {
  constructor(private readonly userBattlesService: UserBattlesService) {}

  //implement an  auth middleware
  @Post()
  async create(
    @Body() createUserBattlesDto: CreateUserBattlesDto,
  ): Promise<string> {
    console.log('hello');

    const insertedUserId =
      await this.userBattlesService.createUserBattlesRecord(
        createUserBattlesDto,
      );
    return insertedUserId;
  }

  @Put()
  async update(
    @Body() updateUserBattlesDto: UpdateUserBattlesDto,
  ): Promise<string> {
    const insertedUserId =
      await this.userBattlesService.updateUserBattlesRecord(
        updateUserBattlesDto,
      );
    return insertedUserId;
  }

  // query the user battles
  //query count
  //query completed battles
}
