import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserInferred } from 'src/types';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':username')
  async findUser(
    @Param('username') username: string,
  ): Promise<UserInferred | undefined> {
    const user = await this.usersService.findUser(username);
    return user;
  }
}
