import { Test, TestingModule } from '@nestjs/testing';
import { UserToBattlesService } from './userToBattles.service';
import { UserToBattlesController } from './userToBattles.controller';

describe('BattleController', () => {
  let userToBattlesController: UserToBattlesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserToBattlesController],
      providers: [UserToBattlesService],
    }).compile();

    userToBattlesController = app.get<UserToBattlesController>(
      UserToBattlesController,
    );
  });

  // describe('root', () => {
  //   it('should return "Hello World!"', () => {
  //     expect(userToBattlesController.getHello()).toBe('Hello World!');
  //   });
  // });
});
