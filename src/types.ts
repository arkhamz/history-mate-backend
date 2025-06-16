import { InferSelectModel } from 'drizzle-orm';
import {
  usersTable,
  battlesTable,
  commandersTable,
  userBattlesTable,
} from 'src/db/schema';

export type UserInferred = InferSelectModel<typeof usersTable>;
export type BattleInferred = InferSelectModel<typeof battlesTable>;
export type CommanderInferred = InferSelectModel<typeof commandersTable>;

export type userBattlesJoin = {
  user_battles: InferSelectModel<typeof userBattlesTable>;
  battles: InferSelectModel<typeof battlesTable> | undefined;
};
