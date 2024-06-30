import { Test, TestingModule } from '@nestjs/testing';
import { kontratService } from './kontrat.service';

describe('KontratService', () => {
  let service: kontratService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [kontratService],
    }).compile();

    service = module.get<kontratService>(kontratService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
