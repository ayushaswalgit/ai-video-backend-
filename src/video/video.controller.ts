import { Body, Controller, Post } from '@nestjs/common';
import { VideoService } from './video.service';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}
  @Post('generate')
  async generateVideo(@Body() Body: { image: string[] }) {
    return await this.videoService.generateVideo(Body.image);
  }
}
