import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';

@Injectable()
export class CaptionService {
  private gentAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

  async generateCaption(imageurl: string) {
    try {
      const response = await axios.get(imageurl, {
        responseType: 'arraybuffer',
      });
      const base64 = Buffer.from(response.data).toString('base64');
      const model = this.gentAi.getGenerativeModel({
        model: 'gemini-pro-vision',
      });
      const result = await model.generateContent([
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: base64,
          },
        },
        {
          text: 'Generate a short Instagram caption with emojis',
        },
      ]);
      const text = result.response.text();

      return {
        caption: text,
      };
    } catch (e) {
      console.log('Gemini error:', e);
      throw new Error('Caption generation failed');
    }
  }
}
