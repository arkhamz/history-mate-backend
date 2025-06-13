import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { UserToBattlesService } from './userToBattles.service';
import {
  CreateUserToBattlesDto,
  UpdateUserToBattlesDto,
} from './userToBattles.dtos';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('user-to-battles')
export class UserToBattlesController {
  constructor(private readonly userToBattlesService: UserToBattlesService) {}

  //implement an  auth middleware
  @Post()
  async create(
    @Body() createUserToBattlesDto: CreateUserToBattlesDto,
  ): Promise<string> {
    console.log('hello');

    const insertedUserId =
      await this.userToBattlesService.createUserToBattlesRecord(
        createUserToBattlesDto,
      );
    return insertedUserId;
  }

  @Put()
  async update(
    @Body() updateUserToBattlesDto: UpdateUserToBattlesDto,
  ): Promise<string> {
    const insertedUserId =
      await this.userToBattlesService.updateUserToBattlesRecord(
        updateUserToBattlesDto,
      );
    return insertedUserId;
  }
}
