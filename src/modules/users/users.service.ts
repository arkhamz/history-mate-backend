import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { usersTable, userBattlesTable } from 'src/db/schema';
import { eq } from 'drizzle-orm';
import { UserInferred } from 'src/types';
import { CreateUserDto } from './dtos/create-user-dto';

@Injectable()
export class UsersService {
  //Inject NodePgDatabase instance registered under the name 'DRIZZLE' and make it available inside this class via this.db.
  constructor(@Inject('DRIZZLE') private readonly db: NodePgDatabase) {}

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<{ username: string; password: string; id: string }> {
    try {
      const { username, password } = createUserDto;

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await this.db
        .insert(usersTable)
        .values({ username, password: hashedPassword })
        .returning({ insertedId: usersTable.id });

      const insertedId = newUser?.[0]?.insertedId;

      if (!insertedId) {
        console.log('createUser | Error creating user');
        throw new InternalServerErrorException('Failed to create user');
      }

      //create join table record
      await this.db
        .insert(userBattlesTable)
        .values({ battle_id: 1, user_id: insertedId, unlocked: true });

      return { username: username, password: hashedPassword, id: insertedId };
    } catch (error: any) {
      if (error?.query?.code === '23505') {
        throw new ConflictException('Email already exists');
      }
      // Unexpected error
      console.error('createUser | Unexpected error:', error?.cause);
      throw new InternalServerErrorException('Unexpected error creating user');
    }
  }

  async findUser(username: string): Promise<UserInferred | undefined> {
    try {
      const userResults = await this.db
        .select()
        .from(usersTable)
        .where(eq(usersTable.username, username));
      const user: UserInferred = userResults?.[0];

      if (user) {
        return user;
      }
    } catch (error) {
      console.error('findUser |  error:', error?.cause);
      throw new InternalServerErrorException('Unexpected error fetching user');
    }
  }
}
