import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './user.dtos';
import * as bcrypt from 'bcrypt';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

@Injectable()
export class UsersService {
  //we use @inject to inject custom postgres  db provider and we register it with the token 'DRIZZLE'
  //I.E. "Inject the NodePgDatabase instance registered under the name 'DRIZZLE' and make it available inside this class as this.db."
  constructor(@Inject('DRIZZLE') private readonly db: NodePgDatabase) {}
  async createUser(createUserDto: CreateUserDto) {
    const { display_name, email, password } = createUserDto;

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 = salt rounds

    //insert user

    const newUser = {
      display_name,
      email,
      password: hashedPassword,
    };
  }
}
