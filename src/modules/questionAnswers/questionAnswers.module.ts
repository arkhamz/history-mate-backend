import { Module } from '@nestjs/common';

import { QuestionAnswersService } from './questionAnswers.service';
import { QuestionAnswersController } from './questionAnswers.controller';

@Module({
  imports: [],
  controllers: [QuestionAnswersController],
  providers: [QuestionAnswersService],
})
export class QuestionAnswersModule {}
