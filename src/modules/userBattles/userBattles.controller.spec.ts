import { Test, TestingModule } from '@nestjs/testing';
import { UserBattlesService } from './userBattles.service';
import { UserBattlesController } from './userBattles.controller';

describe('BattleController', () => {
  let userBattlesController: UserBattlesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserBattlesController],
      providers: [UserBattlesService],
    }).compile();

    userBattlesController = app.get<UserBattlesController>(
      UserBattlesController,
    );
  });

  // describe('root', () => {
  //   it('should return "Hello World!"', () => {
  //     expect(UserBattlesController.getHello()).toBe('Hello World!');
  //   });
  // });
});
