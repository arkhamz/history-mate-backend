import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { commandersTable } from 'src/db/schema';
import { CommanderInferred } from 'src/types';

@Injectable()
export class CommandersService {
  //we use @inject to inject custom postgres  db provider and we register it with the token 'DRIZZLE'
  //I.E. "Inject the NodePgDatabase instance registered under the name 'DRIZZLE' and make it available inside this class as this.db."
  constructor(@Inject('DRIZZLE') private readonly db: NodePgDatabase) {}

  async getAllCommanders(): Promise<CommanderInferred[]> {
    try {
      const commanders = await this.db.select().from(commandersTable);
      return commanders;
    } catch (error) {
      // Unexpected error
      console.error('getAllCommanders | Unexpected error:', error?.cause);
      throw new InternalServerErrorException(
        'Unexpected error selecting commanders',
      );
    }
  }

  async getCommander(id: number): Promise<CommanderInferred | undefined> {
    try {
      const commanderResults = await this.db
        .select()
        .from(commandersTable)
        .where(eq(commandersTable.id, id));
      const commander = commanderResults?.[0];
      return commander;
    } catch (error) {
      console.error('getCommander | Unexpected error:', error?.cause);
      throw new InternalServerErrorException(
        'Unexpected error selecting commander',
      );
    }
  }
}
