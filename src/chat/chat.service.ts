import { ChatMessage } from './../../generated/prisma/index.d';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { GeminiService } from 'src/gemini/gemini.service';
import { ChatResponse, SendMessageRequest } from './chat.model';
import { MessageRole } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

  constructor(
    private prisma: PrismaService,
    private geminiService: GeminiService,
  ) {}

  async sendMessage(req: SendMessageRequest): Promise<ChatResponse> {
    let session;
    // if (req.session_id) {
    //   session = await this.prisma.chatSession.findFirst({
    //     where: { id: req.session_id },
    //   });

    //   if (!session) {
    //     throw new Error('Session not found');
    //   }

    // } else {
      session = await this.prisma.chatSession.create({
        data: {
          user_id: req.user_id,
          created_at: new Date(),
        },
      });
    // }

    // save user message
    await this.prisma.chatMessage.create({
      data: {
        session_id: session.id,
        role: MessageRole.USER,
        content: req.message,
        problem: req.message, // Assuming the message is a math problem
        created_at: new Date(),
      },
    });

    // Get AI response
    const mathSolution = await this.geminiService.solveProblem(req.message);

    // Format response
    const responseContent = this.formatMathReponse(mathSolution);

    // save AI response
    await this.prisma.chatMessage.create({
      data: {
        session_id: session.id,
        role: MessageRole.ASSISTANT,
        content: responseContent,
        solution: mathSolution.solution,
        confidence: mathSolution.confidence,
      },
    });

    // Create ChatResponse
    return {
      session_id: session.id,
      response: responseContent,
      solution: mathSolution.solution,
      steps: mathSolution.steps,
      confidence: mathSolution.confidence,
      timestamp: new Date(),
    };
  }

  async getChatHistory(id: string) {
    const session = await this.prisma.chatSession.findUnique({
      where: { id },
      include: {
        messages: {
          orderBy: { created_at: 'asc' },
        },
      },
    });

    if (!session) {
      throw new NotFoundException('Chat session not found');
    }

    return session;
  }

  async getAllSessions(id?: string) {
    return this.prisma.chatSession.findMany({
      where: { id },
      include: {
        _count: {
          select: { messages: true },
        },
      },
      orderBy: { updated_at: 'desc' },
    });
  }

  private formatMathReponse(solution: any): string {
    let response = `Solution: ${solution.solution}\n\n`;

    if (solution.steps && solution.steps.length > 0) {
      response += `Step-by-step solution:\n`;
      solution.steps.forEach((step, index) => {
        response += `${index + 1}. ${step}\n`;
      });
      response += '\n';
    }

    if (solution.explanation) {
      response += `Explanation: ${solution.explanation}\n\n`;
    }

    response += `Confidence: ${(solution.confidence * 100).toFixed(1)}%`;

    return response;
  }
}
