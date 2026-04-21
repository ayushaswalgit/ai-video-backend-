/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';

@Injectable()
export class CaptionService {
  private gentAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

  async generateCaption(imageUrl: string) {
    try {
      if (!imageUrl) {
        throw new Error('Image URL required');
      }

      const response = await axios.get(imageUrl, {
        responseType: 'arraybuffer',
      });

      const base64 = Buffer.from(response.data).toString('base64');

      const mimeType = imageUrl.endsWith('.png') ? 'image/png' : 'image/jpeg';

      const geminiResponse = await axios.post(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  inlineData: {
                    mimeType: mimeType,
                    data: base64,
                  },
                },
                {
                  text: 'Generate a short Instagram caption with emojis',
                },
              ],
            },
          ],
        },
      );

      const data = geminiResponse.data as any;

      const caption = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      return {
        caption: caption ?? 'No caption generated',
      };
    } catch (e) {
      console.log('FULL ERROR:', e);
      throw new Error('Caption generation failed');
    }
  }
}
