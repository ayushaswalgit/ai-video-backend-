import { Module } from '@nestjs/common';
import { CaptionController } from './caption.controller';
import { CaptionService } from './caption.service';

@Module({
  controllers: [CaptionController],
  providers: [CaptionService]
})
export class CaptionModule {}
