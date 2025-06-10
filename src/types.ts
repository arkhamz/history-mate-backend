import { InferSelectModel } from 'drizzle-orm';
import {
  usersTable,
  battlesTable,
  commandersTable,
  usersToBattlesTable,
} from 'src/db/schema';

export type UserInferred = InferSelectModel<typeof usersTable>;
export type BattleInferred = InferSelectModel<typeof battlesTable>;
export type CommanderInferred = InferSelectModel<typeof commandersTable>;

export type userBattlesJoin = {
  users_to_battles: InferSelectModel<typeof usersToBattlesTable>;
  battles: InferSelectModel<typeof battlesTable> | undefined;
};
