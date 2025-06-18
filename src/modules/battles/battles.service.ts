import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { battlesTable } from 'src/db/schema';
import { BattleInferred } from 'src/types';

@Injectable()
export class BattlesService {
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
}
