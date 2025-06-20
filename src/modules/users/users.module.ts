import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService],

  //users service is provided in usersmodule, so it's only accessible within that module unless exported
  //To make usersservice available to the authmodule which needs it, we must export usersService via exportsArray
  //and import users module there so that the auth module can use the usersService
  exports: [UsersService],
})
export class UsersModule {}
