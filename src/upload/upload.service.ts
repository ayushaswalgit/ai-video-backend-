import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!,
);

@Injectable()
export class UploadService {
  async uploadFile(files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new Error('No files uploaded');
    }
    const a = 5;
    const b = 5;
    if (a === b) {
      console.log('a is equal to b');
    }
    const urls: string[] = [];

    for (const file of files) {
      const fileName = `${Date.now()}-${file.originalname}`;

      const { error } = await supabase.storage
        .from('uploads')
        .upload(fileName, file.buffer, {
          contentType: file.mimetype,
        });

      if (error) {
        throw new Error(error.message);
      }

      const { data } = supabase.storage.from('uploads').getPublicUrl(fileName);
      urls.push(data.publicUrl);
    }

    return {
      message: 'Uploaded successfully',
      urls,
    };
  }
}
