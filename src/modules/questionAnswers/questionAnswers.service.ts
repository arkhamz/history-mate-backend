import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { questionsTable } from 'src/db/schema';

import { questionAnswersTable } from 'src/db/schema';

@Injectable()
export class QuestionAnswersService {
  //I.E. "Inject the NodePgDatabase instance registered under the name 'DRIZZLE' and make it available inside this class as this.db."
  constructor(@Inject('DRIZZLE') private readonly db: NodePgDatabase) {}

  async getAllBattleQuestions(battleId: string): Promise<
    {
      question: typeof questionsTable.$inferSelect;
      answers: (typeof questionAnswersTable.$inferSelect)[];
    }[]
  > {
    try {
      const questionsAnswersJoin = await this.db
        .select()
        .from(questionAnswersTable)
        .innerJoin(
          questionsTable,
          eq(questionAnswersTable.question_id, questionsTable.id),
        )
        .where(
          and(
            eq(questionAnswersTable.question_id, questionsTable.id),
            eq(questionsTable.battle_id, +battleId),
          ),
        );

      //a map with a number key, and a {question,answers} object
      const groupedMap = new Map<
        number,
        {
          question: typeof questionsTable.$inferSelect;
          answers: (typeof questionAnswersTable.$inferSelect)[];
        }
      >();

      //You loop over each row from your innerJoin query.
      //each row = {questions: {}, question_answers:{}}

      for (const row of questionsAnswersJoin) {
        const q = row.questions;
        const a = row.question_answers;

        //if map doesn't have current id, add it with an empty answers array
        if (!groupedMap.has(q.id)) {
          groupedMap.set(q.id, { question: q, answers: [] });
        }
        //push the current answer  into the array
        //So if there are 3 answers for the same question, you'll loop over them and push each into the same entry in the map.
        groupedMap.get(q.id)!.answers.push(a);
      }
      const arrayFromMap = Array.from(groupedMap.values());
      return arrayFromMap;

      // const questions = questionsAnswersJoin.map((f) => f.questions);
      // const uniqueQuestionIds = Array.from(
      //   new Set(questionsAnswersJoin.map((f) => f.questions.id)),
      // );
      // console.log({ uniqueQuestionIds });
      // //loop through unique questionIds
      // //find question with that id
      // //get all answers that have that question id
      // const answers = questionsAnswersJoin.map((f) => f.question_answers);
      // const final = uniqueQuestionIds
      //   .map((quesId) => {
      //     const question = questions.find((q) => q.id === quesId);
      //     const qAnswers = answers.filter((f) => f.question_id === quesId);

      //     return { question: question, answers: qAnswers };
      //   })
      //   .filter((f) => f);
      // console.log(final);
    } catch (error) {
      // Unexpected error
      console.error('getAllBattles | Unexpected error:', error?.cause);
      throw new InternalServerErrorException(
        'Unexpected error selecting battles',
      );
    }
  }
}
