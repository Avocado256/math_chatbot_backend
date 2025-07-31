import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { GeminiService } from '../gemini/gemini.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ChatController],
  providers: [ChatService, GeminiService],
})
export class ChatModule {}