import { Body, Controller, Post } from '@nestjs/common';
import { VideoService } from './video.service';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}
  @Post('generate')
  generateVideo(@Body() Body: { image: string[] }) {
    console.log(Body.image);
  }
}
