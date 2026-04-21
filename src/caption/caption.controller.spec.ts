import { Test, TestingModule } from '@nestjs/testing';
import { CaptionController } from './caption.controller';

describe('CaptionController', () => {
  let controller: CaptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CaptionController],
    }).compile();

    controller = module.get<CaptionController>(CaptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
