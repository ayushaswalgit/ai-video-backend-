import { Body, Controller, Post } from '@nestjs/common';
import { CaptionService } from './caption.service';

@Controller('caption')
export class CaptionController {
  constructor(private readonly captionService: CaptionService) {}

  @Post('/generate-caption')
  async generateCaption(@Body() body: { imageurl: string }) {
    return this.captionService.generateCaption(body.imageurl);
  }
}
