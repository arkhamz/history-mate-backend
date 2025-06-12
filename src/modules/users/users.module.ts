import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService],
  //export usersService so that authModule can use it
  exports: [UsersService],
})
export class UsersModule {}
