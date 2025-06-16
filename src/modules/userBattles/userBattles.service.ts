import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { userBattlesTable } from 'src/db/schema';
import { CreateUserBattlesDto, UpdateUserBattlesDto } from './userBattles.dtos';

@Injectable()
export class UserBattlesService {
  //we use @inject to inject custom postgres  db provider and we register it with the token 'DRIZZLE'
  //I.E. "Inject the NodePgDatabase instance registered under the name 'DRIZZLE' and make it available inside this class as this.db."
  constructor(@Inject('DRIZZLE') private readonly db: NodePgDatabase) {}

  async createUserBattlesRecord(createUserBattlesDto: CreateUserBattlesDto) {
    try {
      const { battle_id, user_id } = createUserBattlesDto;

      console.log(battle_id, user_id);
      const newRecord = await this.db
        .insert(userBattlesTable)
        .values({ battle_id: +battle_id, user_id, unlocked: true })
        .returning({ insertedId: userBattlesTable.user_id });

      const insertedId = newRecord?.[0]?.insertedId;
      return insertedId;
    } catch (error) {
      // Unexpected error
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
      const { battle_id, user_id } = updateUserBattlesDto;

      console.log(battle_id, user_id);
      const newRecord = await this.db
        .insert(userBattlesTable)
        .values({ battle_id: +battle_id, user_id, completed: true })
        .returning({ insertedId: userBattlesTable.user_id });

      const insertedId = newRecord?.[0]?.insertedId;
      return insertedId;
    } catch (error) {
      // Unexpected error
      console.error(
        'updateUserBattlesRecord | Unexpected error:',
        error?.cause,
      );
      throw new InternalServerErrorException(
        'Unexpected error updating user battle progress record',
      );
    }
  }
}
