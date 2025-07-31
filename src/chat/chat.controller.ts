import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { SendMessageRequest } from "./chat.model";
import { ChatService } from "./chat.service";

@Controller('api/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('message')
  async sendMessage(@Body() dto: SendMessageRequest) {
    return this.chatService.sendMessage(dto);
  }

  @Get('history/:id')
  async getChatHistory(@Param('id') id: string) {
    return this.chatService.getChatHistory(id);
  }

  @Get('sessions')
  async getAllSessions(@Query('user_id') user_id?: string) {
    return this.chatService.getAllSessions(user_id);
  }
}