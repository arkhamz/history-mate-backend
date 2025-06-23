import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserBattlesService } from './userBattles.service';
import { CreateUserBattlesDto, UpdateUserBattlesDto } from './userBattles.dtos';
import { PassportJwtAuthGuard } from '../auth/guards/passport-jwt.guard';

@Controller('user-battles')
export class UserBattlesController {
  constructor(private readonly userBattlesService: UserBattlesService) {}

  //Create user battle (progress) record
  @UseGuards(PassportJwtAuthGuard)
  @Post()
  async create(
    @Body() createUserBattlesDto: CreateUserBattlesDto,
    @Request() request,
  ): Promise<{ insertedId: string }> {
    const insertedUserId =
      await this.userBattlesService.createUserBattlesRecord(
        createUserBattlesDto,
        request.user.userId,
      );
    return insertedUserId;
  }

  //Update user battle (only completed for now)
  @UseGuards(PassportJwtAuthGuard)
  @Patch()
  async update(
    @Body() updateUserBattlesDto: UpdateUserBattlesDto,
    @Request() request,
  ): Promise<{ insertedId: string }> {
    const insertedUserId =
      await this.userBattlesService.updateUserBattlesRecord(
        updateUserBattlesDto,
        request.user.userId,
      );
    return insertedUserId;
  }

  //Get user battles count
  @UseGuards(PassportJwtAuthGuard)
  //user-battles/count
  @Get('count')
  async findAndCount(@Request() request) {
    const userBattleCount = await this.userBattlesService.getUserBattlesCount(
      request.user.userId,
    );
    return userBattleCount;
  }

  // Get single user battle
  @UseGuards(PassportJwtAuthGuard)
  //user-battles/1
  @Get(':battleId')
  async findOne(@Request() request, @Param('battleId') battleId: string) {
    const battle = await this.userBattlesService.getUserBattle(
      request.user.userId,
      +battleId,
    );
    return battle;
  }

  // Get all user battles
  @UseGuards(PassportJwtAuthGuard)
  @Get()
  //user-battles
  async findAll(@Request() request) {
    const battle = await this.userBattlesService.getUserBattles(
      request.user.userId,
    );
    return battle;
  }
}
