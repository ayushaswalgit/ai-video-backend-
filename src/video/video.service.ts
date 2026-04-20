/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import axios from 'axios';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';

ffmpeg.setFfmpegPath(ffmpegPath as string);

@Injectable()
export class VideoService {
  private tempdir = path.join(__dirname, 'temp');

  constructor() {
    if (!fs.existsSync(this.tempdir)) {
      fs.mkdirSync(this.tempdir);
    }
  }

  async generateVideo(image: string[]) {
    const imagePaths: string[] = [];

    for (let i = 0; i < image.length; i++) {
      const url = image[i];
      const filePath = path.join(this.tempdir, `image${i}.jpg`);
      const response = await axios.get(url, {
        responseType: 'stream',
      });
      fs.writeFileSync(filePath, response.data);
      imagePaths.push(filePath);
    }
    const outputPath = path.join(this.tempdir, `video-${Date.now()}.mp4`);

    // eslint-disable-next-line prettier/prettier

    await new Promise((resolve, reject) => {
      const command = ffmpeg();
      imagePaths.forEach((imagePath) => {
        command.input(imagePath).inputOptions(['-loop 1', '-t 2']);
      });
      command
        .outputOptions(['-c:v libx264', '-r 25', '-pix_fmt yuv420p'])
        .on('end', () => {
          console.log('Video created:', outputPath);
          resolve(true);
        })
        .on('error', (err) => {
          console.log('FFmpeg error:', err);
          reject(err);
        })
        .save(outputPath);
    });

    return {
      message: 'Video generated successfully',
      videoPath: outputPath,
    };
  }
}
