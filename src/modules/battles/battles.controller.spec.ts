import { Test, TestingModule } from '@nestjs/testing';
import { BattlesService } from './battles.service';
import { BattlesController } from './battles.controller';

describe('BattleController', () => {
  let battleController: BattlesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BattlesController],
      providers: [BattlesService],
    }).compile();

    battleController = app.get<BattlesController>(BattlesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(battleController.getHello()).toBe('Hello World!');
    });
  });
});
