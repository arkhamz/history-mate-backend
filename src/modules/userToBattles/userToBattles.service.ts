import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { usersToBattlesTable } from 'src/db/schema';
import {
  CreateUserToBattlesDto,
  UpdateUserToBattlesDto,
} from './userToBattles.dtos';

@Injectable()
export class UserToBattlesService {
  //we use @inject to inject custom postgres  db provider and we register it with the token 'DRIZZLE'
  //I.E. "Inject the NodePgDatabase instance registered under the name 'DRIZZLE' and make it available inside this class as this.db."
  constructor(@Inject('DRIZZLE') private readonly db: NodePgDatabase) {}

  async createUserToBattlesRecord(
    createUserToBattlesDto: CreateUserToBattlesDto,
  ) {
    try {
      const { battle_id, user_id } = createUserToBattlesDto;

      console.log(battle_id, user_id);
      const newRecord = await this.db
        .insert(usersToBattlesTable)
        .values({ battle_id: +battle_id, user_id, unlocked: true })
        .returning({ insertedId: usersToBattlesTable.user_id });

      const insertedId = newRecord?.[0]?.insertedId;
      return insertedId;
    } catch (error) {
      // Unexpected error
      console.error(
        'createUserToBattlesRecord | Unexpected error:',
        error?.cause,
      );
      throw new InternalServerErrorException(
        'Unexpected error creating user battle progress record',
      );
    }
  }

  async updateUserToBattlesRecord(
    updateUserToBattlesDto: UpdateUserToBattlesDto,
  ) {
    try {
      const { battle_id, user_id } = updateUserToBattlesDto;

      console.log(battle_id, user_id);
      const newRecord = await this.db
        .insert(usersToBattlesTable)
        .values({ battle_id: +battle_id, user_id, completed: true })
        .returning({ insertedId: usersToBattlesTable.user_id });

      const insertedId = newRecord?.[0]?.insertedId;
      return insertedId;
    } catch (error) {
      // Unexpected error
      console.error(
        'updateUserToBattlesRecord | Unexpected error:',
        error?.cause,
      );
      throw new InternalServerErrorException(
        'Unexpected error updating user battle progress record',
      );
    }
  }
}
