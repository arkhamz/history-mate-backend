import { InferSelectModel } from 'drizzle-orm';
import {
  usersTable,
  battlesTable,
  commandersTable,
  userBattlesTable,
  questionsTable,
  questionAnswersTable,
} from 'src/db/schema';

export type UserInferred = InferSelectModel<typeof usersTable>;
export type BattleInferred = InferSelectModel<typeof battlesTable>;
export type CommanderInferred = InferSelectModel<typeof commandersTable>;
export type QuestionInferred = InferSelectModel<typeof questionsTable>;
export type QuestionAnswer = InferSelectModel<typeof questionAnswersTable>;

export interface EnrichedBattle extends InferSelectModel<typeof battlesTable> {
  completed: boolean;
}

export type userBattlesJoin = {
  user_battles: InferSelectModel<typeof userBattlesTable>;
  battles: InferSelectModel<typeof battlesTable> | undefined;
};

export type AuthInput = { username: string; password: string };
export type SignInData = { userId: string; username: string };
export type AuthResult = {
  accessToken: string;
  userId: string;
  username: string;
};

export type userBattlesCountData = {
  battle_id: number;
  completed: boolean | null;
};

export interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
    username: string;
  };
}
