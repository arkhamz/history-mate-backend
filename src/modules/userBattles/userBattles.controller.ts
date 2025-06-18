import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserBattlesService } from './userBattles.service';
import { CreateUserBattlesDto, UpdateUserBattlesDto } from './userBattles.dtos';
// import { AuthGuard } from '../auth/guards/auth.guard';
import { PassportJwtAuthGuard } from '../auth/guards/passport-jwt.guard';

@Controller('user-battles')
export class UserBattlesController {
  constructor(private readonly userBattlesService: UserBattlesService) {}

  //Create user battle (progress) record
  @UseGuards(PassportJwtAuthGuard)
  @Post()
  async create(
    @Body() createUserBattlesDto: CreateUserBattlesDto,
  ): Promise<string> {
    const insertedUserId =
      await this.userBattlesService.createUserBattlesRecord(
        createUserBattlesDto,
      );
    return insertedUserId;
  }

  //Update user battle (only completed for now)
  @UseGuards(PassportJwtAuthGuard)
  @Patch()
  async update(
    @Body() updateUserBattlesDto: UpdateUserBattlesDto,
  ): Promise<string> {
    const insertedUserId =
      await this.userBattlesService.updateUserBattlesRecord(
        updateUserBattlesDto,
      );
    return insertedUserId;
  }

  // Get all user battles by id
  @UseGuards(PassportJwtAuthGuard)
  @Get(':id')
  async findAll(@Param('id') id: string) {
    const battle = await this.userBattlesService.getUserBattles(id);
    return battle;
  }
  //Get user battles count
  @UseGuards(PassportJwtAuthGuard)
  @Get('count/:id')
  async findAndCount(@Param('id') id: string) {
    const userBattleCount =
      await this.userBattlesService.getUserBattlesCount(id);
    return userBattleCount;
  }
}
