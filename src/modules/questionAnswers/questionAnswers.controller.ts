import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { QuestionAnswersService } from './questionAnswers.service';
import { PassportJwtAuthGuard } from '../auth/guards/passport-jwt.guard';

@Controller('question-answers')
export class QuestionAnswersController {
  constructor(
    private readonly questionAnswersService: QuestionAnswersService,
  ) {}

  @UseGuards(PassportJwtAuthGuard)
  @Get(':battle_id')
  async findAllByBattleId(@Param('battle_id') battle_id: string): Promise<any> {
    return await this.questionAnswersService.getAllBattleQuestions(battle_id);
  }
}
