import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MathSolution } from './gemini.model';

@Injectable()
export class GeminiService {
  private readonly logger = new Logger(GeminiService.name);
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    this.genAI = new GoogleGenerativeAI(apiKey!);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  }

  async solveProblem(problem: string): Promise<MathSolution> {
    try {
      const prompt = `
        You are an expert math tutor. Solve this math problem step by step:

        Problem: ${problem}

        Please provide:
        1. The final answer
        2. Step-by-step solution
        3. Clear explanation of each step
        4. Your confidence level (0-1) in the solution

        Format your response as:
        ANSWER: [final answer]
        
        STEPS:
        - Step 1: [explanation]
        - Step 2: [explanation]
        ...
        
        EXPLANATION: [detailed explanation]
        
        CONFIDENCE: [0.0-1.0]
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return this.parseMathResponse(text);
    } catch (error) {
      this.logger.error('Error solving math problem:', error);
      throw new Error('Failed to solve math problem');
    }
  }

  private parseMathResponse(response: string): MathSolution {
    const lines = response.split('\n');
    let solution = '';
    const steps: string[] = [];
    let explanation = '';
    let confidence = 0.8; // Default

    let currentSection = '';

    for (const line of lines) {
      const trimmedLine = line.trim();

      if (trimmedLine.startsWith('ANSWER:')) {
        solution = trimmedLine.replace('ANSWER:', '').trim();
        currentSection = 'answer';
      } else if (trimmedLine.startsWith('STEPS:')) {
        currentSection = 'steps';
      } else if (trimmedLine.startsWith('EXPLANATION:')) {
        explanation = trimmedLine.replace('EXPLANATION:', '').trim();
        currentSection = 'explanation';
      } else if (trimmedLine.startsWith('CONFIDENCE:')) {
        const confStr = trimmedLine.replace('CONFIDENCE:', '').trim();
        confidence = parseFloat(confStr) || 0.8;
        currentSection = '';
      } else if (currentSection === 'steps' && trimmedLine.startsWith('-')) {
        steps.push(trimmedLine.replace(/^-\s*/, ''));
      } else if (currentSection === 'explanation' && trimmedLine) {
        explanation += ' ' + trimmedLine;
      }
    }

    return {
      solution: solution || response,
      steps,
      confidence,
      explanation: explanation || 'Solution provided above.',
    }
  }
}
