import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class SendMessageRequest {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsOptional()
  session_id?: string;

  @IsOptional()
  user_id?: string;
}

export class ChatResponse {
    session_id: string;
    response: string;
    solution?: string;
    steps?: string[];
    confidence?: number;
    timestamp: Date;
}