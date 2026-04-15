/* eslint-disable prettier/prettier */
import { Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';


import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @Post('image')
  @UseInterceptors(FilesInterceptor('file',2))
  uploadImage(@UploadedFiles() files: Express.Multer.File[]) {
    return this.uploadService.uploadFile(files);
  }
}
