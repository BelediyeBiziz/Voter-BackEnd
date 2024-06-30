import { Test, TestingModule } from '@nestjs/testing';
import { KontratController } from './kontrat.controller';

describe('KontratController', () => {
  let controller: KontratController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KontratController],
    }).compile();

    controller = module.get<KontratController>(KontratController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
