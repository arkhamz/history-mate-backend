import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './user.dtos';
import * as bcrypt from 'bcrypt';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { usersTable, usersToBattlesTable } from 'src/db/schema';
import { eq } from 'drizzle-orm';
import { UserInferred } from 'src/types';

@Injectable()
export class UsersService {
  //we use @inject to inject custom postgres  db provider and we register it with the token 'DRIZZLE'
  //I.E. "Inject the NodePgDatabase instance registered under the name 'DRIZZLE' and make it available inside this class as this.db."
  constructor(@Inject('DRIZZLE') private readonly db: NodePgDatabase) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const { display_name, email, password } = createUserDto;

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await this.db
        .insert(usersTable)
        .values({ display_name, email, password: hashedPassword })
        .returning({ insertedId: usersTable.id });

      const insertedId = newUser?.[0]?.insertedId;

      if (!insertedId) {
        console.log('createUser | Error creating user');
        throw new InternalServerErrorException('Failed to create user');
      }

      //create join table record
      await this.db
        .insert(usersToBattlesTable)
        .values({ battle_id: 1, user_id: insertedId, unlocked: true });

      return insertedId;
    } catch (error: any) {
      if (error?.query?.code === '23505') {
        throw new ConflictException('Email already exists');
      }
      // Unexpected error
      console.error('createUser | Unexpected error:', error?.cause);
      throw new InternalServerErrorException('Unexpected error creating user');
    }
  }

  async findUser(id: string): Promise<UserInferred | undefined> {
    try {
      const userResults = await this.db
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, `${id}`));
      const user: UserInferred = userResults?.[0];

      if (user) {
        console.log(user);
        return user;
      }
    } catch (error) {
      // Unexpected error
      console.error('findUser |  error:', error?.cause);
      throw new InternalServerErrorException('Unexpected error fetching user');
    }
  }
}
