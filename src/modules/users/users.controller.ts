import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './user.dtos';
import { ClientUser } from './types';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<string> {
    const insertedUserId = await this.usersService.createUser(createUserDto);
    if (insertedUserId) {
      console.log(
        `Successfully created new user. Inserted id = ${insertedUserId}`,
      );
    }
    return insertedUserId;
  }

  @Get(':id')
  async findUser(@Param('id') id: string): Promise<ClientUser | undefined> {
    const user = await this.usersService.findUser(id);
    return user;
  }
}
