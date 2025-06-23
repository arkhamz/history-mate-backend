import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService],

  //Export UsersService so that it can be used by authmodule/other modules that need it.
  //E.g. authmodule.imports includes UsersModule, and authService imports usersService
  exports: [UsersService],
})
export class UsersModule {}
