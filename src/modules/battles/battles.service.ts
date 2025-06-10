import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { battlesTable, usersToBattlesTable } from 'src/db/schema';
import { BattleInferred, userBattlesJoin } from 'src/types';

@Injectable()
export class BattlesService {
  //we use @inject to inject custom postgres  db provider and we register it with the token 'DRIZZLE'
  //I.E. "Inject the NodePgDatabase instance registered under the name 'DRIZZLE' and make it available inside this class as this.db."
  constructor(@Inject('DRIZZLE') private readonly db: NodePgDatabase) {}

  async getAllBattles(): Promise<BattleInferred[] | undefined> {
    try {
      const battles = await this.db.select().from(battlesTable);
      if (!battles?.length) {
        console.log('getAllBattles | Error creating user');
        throw new InternalServerErrorException('Failed to select battle');
      }
      return battles;
    } catch (error) {
      // Unexpected error
      console.error('getAllBattles | Unexpected error:', error?.cause);
      throw new InternalServerErrorException(
        'Unexpected error selecting battles',
      );
    }
  }

  async getBattle(id: number): Promise<BattleInferred | undefined> {
    try {
      const battleResult = await this.db
        .select()
        .from(battlesTable)
        .where(eq(battlesTable.id, id));
      const battle = battleResult?.[0];
      if (!battle) {
        console.log('getBattle | Error selecting battle');
        throw new InternalServerErrorException('Failed to select battle');
      }
      return battle;
    } catch (error) {
      // Unexpected error
      console.error('getBattle | Unexpected error:', error?.cause);
      throw new InternalServerErrorException(
        'Unexpected error selecting battle',
      );
    }
  }

  async getUserBattles(id: string): Promise<userBattlesJoin[]> {
    try {
      const userBattlesJoinResult: userBattlesJoin[] = await this.db
        .select()
        .from(usersToBattlesTable)
        .innerJoin(
          battlesTable,
          eq(usersToBattlesTable.battle_id, battlesTable.id),
        )
        .where(eq(usersToBattlesTable.user_id, id));
      if (!userBattlesJoinResult) {
        console.log('getUserBattles | Error selecting user battles');
        throw new InternalServerErrorException('Failed to select user battles');
      }
      return userBattlesJoinResult;
    } catch (error) {
      // Unexpected error
      console.error('getUserBattles | Unexpected error:', error?.cause);
      throw new InternalServerErrorException(
        'Unexpected error selecting user battles',
      );
    }
  }
}
