import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { battlesTable, userBattlesTable } from 'src/db/schema';
import { CreateUserBattlesDto, UpdateUserBattlesDto } from './userBattles.dtos';
import { EnrichedBattle, userBattlesJoin } from 'src/types';
import { and, eq } from 'drizzle-orm';

@Injectable()
export class UserBattlesService {
  // inject custom postgres db provider into this service and register it under'DRIZZLE'
  constructor(@Inject('DRIZZLE') private readonly db: NodePgDatabase) {}

  async createUserBattlesRecord(createUserBattlesDto: CreateUserBattlesDto) {
    try {
      const { battle_id, user_id } = createUserBattlesDto;

      const userBattlesCount = await this.getUserBattlesCount(user_id);
      if (userBattlesCount?.battles?.find((i) => i.battle_id == 12)) {
        throw new InternalServerErrorException(
          'createUserBattlesRecord | All battles are already unlocked',
        );
      }
      const newRecord = await this.db
        .insert(userBattlesTable)
        .values({ battle_id: +battle_id + 1, user_id, unlocked: true })
        .returning({ insertedId: userBattlesTable.user_id });

      const insertedId = newRecord?.[0]?.insertedId;
      return { insertedId };
    } catch (error) {
      console.error(
        'createUserBattlesRecord | Unexpected error:',
        error?.cause,
      );
      throw new InternalServerErrorException(
        'Unexpected error creating user battle progress record',
      );
    }
  }

  async updateUserBattlesRecord(updateUserBattlesDto: UpdateUserBattlesDto) {
    try {
      const { completed, battle_id, user_id } = updateUserBattlesDto;

      const updatedRecord = await this.db
        .update(userBattlesTable)
        .set({ completed: true })
        .where(
          and(
            eq(userBattlesTable.user_id, user_id),
            eq(userBattlesTable.battle_id, battle_id),
          ),
        )
        .returning({ insertedId: userBattlesTable.user_id });

      const insertedId = updatedRecord?.[0]?.insertedId;
      return { insertedId: insertedId };
    } catch (error) {
      console.error(
        'updateUserBattlesRecord | Unexpected error:',
        error?.cause,
      );
      throw new InternalServerErrorException(
        'Unexpected error updating user battle progress record',
      );
    }
  }

  async getUserBattles(userId: string): Promise<EnrichedBattle[]> {
    try {
      const userBattlesJoinResult: userBattlesJoin[] = await this.db
        .select()
        .from(userBattlesTable)
        .innerJoin(
          battlesTable,
          eq(userBattlesTable.battle_id, battlesTable.id),
        )
        .where(eq(userBattlesTable.user_id, userId));

      if (!userBattlesJoinResult || !userBattlesJoinResult?.length) {
        console.log('getUserBattles | Error selecting user battles');
        throw new InternalServerErrorException('Failed to select user battles');
      }

      const battles = userBattlesJoinResult.map(
        (i) =>
          ({
            ...i.battles,
            completed: i.user_battles.completed,
          }) as EnrichedBattle,
      );

      return battles;
    } catch (error) {
      // Unexpected error
      console.error('getUserBattles | Unexpected error:', error?.cause);
      throw new InternalServerErrorException(
        'Unexpected error selecting user battles',
      );
    }
  }

  async getUserBattlesCount(userId: string): Promise<any> {
    try {
      const result = await this.db
        .select({
          battle_id: userBattlesTable.battle_id,
          completed: userBattlesTable.completed,
        })
        .from(userBattlesTable)
        .where(eq(userBattlesTable.user_id, userId));

      if (!result?.length) {
        console.log('getUserBattlesCount | Error fetching user battles count');
        throw new InternalServerErrorException(
          'Failed to fetch user battle count',
        );
      }

      const payload = { count: result?.length, battles: result };
      return payload;
    } catch (error) {
      // Unexpected error
      console.error('getUserBattlesCount | Unexpected error:', error?.cause);
      throw new InternalServerErrorException(
        'Unexpected error selecting user battles',
      );
    }
  }

  async getUserBattle(
    userId: string,
    battleId: number,
  ): Promise<EnrichedBattle> {
    try {
      const userBattleJoinResult: userBattlesJoin[] = await this.db
        .select()
        .from(userBattlesTable)
        .innerJoin(
          battlesTable,
          eq(userBattlesTable.battle_id, battlesTable.id),
        )
        .where(
          and(
            eq(userBattlesTable.user_id, userId),
            eq(userBattlesTable.battle_id, battleId),
          ),
        );

      if (!userBattleJoinResult || !userBattleJoinResult?.length) {
        console.log('getUserBattle | Error selecting user battles');
        throw new InternalServerErrorException('Failed to select user battles');
      }

      const battles = userBattleJoinResult.map(
        (i) =>
          ({
            ...i.battles,
            completed: i.user_battles.completed,
          }) as EnrichedBattle,
      );
      return battles[0];
    } catch (error) {
      // Unexpected error
      console.error('getUserBattle | Unexpected error:', error?.cause);
      throw new InternalServerErrorException(
        'Unexpected error selecting user battles',
      );
    }
  }
}
