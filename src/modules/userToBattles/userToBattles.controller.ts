import { Body, Controller, Post } from '@nestjs/common';
import { UserToBattlesService } from './userToBattles.service';
import { CreateUserToBattlesDto } from './userToBattles.dtos';

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
}
