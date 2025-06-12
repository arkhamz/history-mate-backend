import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserInferred } from 'src/types';
import { CreateUserDto } from './dtos/create-user-dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // async create(@Body() createUserDto: CreateUserDto): Promise<string> {
  //   const insertedUserId = await this.usersService.createUser(createUserDto);
  //   if (insertedUserId) {
  //     console.log(
  //       `Successfully created new user. Inserted id = ${insertedUserId}`,
  //     );
  //   }
  //   return insertedUserId;
  // }

  @Get(':username')
  async findUser(
    @Param('username') username: string,
  ): Promise<UserInferred | undefined> {
    const user = await this.usersService.findUser(username);
    return user;
  }
}
