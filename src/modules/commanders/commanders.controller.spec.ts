import { Test, TestingModule } from '@nestjs/testing';
import { CommandersController } from './commanders.controller';
import { CommandersService } from './commanders.service';

describe('CommanderController', () => {
  let commandersController: CommandersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CommandersController],
      providers: [CommandersService],
    }).compile();

    commandersController = app.get<CommandersController>(CommandersController);
  });

  // describe('root', () => {
  //   it('should return "Hello World!"', () => {
  //     expect(commandersController.getHello()).toBe('Hello World!');
  //   });
  // });
});
