import { Test, TestingModule } from '@nestjs/testing';
import { ProgressController } from './progress.controller';
import { ProgressService } from './progress.service';

describe('ProgressController', () => {
  let progressController: ProgressController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProgressController],
      providers: [ProgressService],
    }).compile();

    progressController = app.get<ProgressController>(ProgressController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(progressController.getHello()).toBe('Hello World!');
    });
  });
});
