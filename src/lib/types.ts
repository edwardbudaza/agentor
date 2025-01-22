import { Id } from '../../convex/_generated/dataModel';

// SSE Constants
export const SSE_DATA_PREFIX = 'data: ' as const;
export const SSE_DONE_MESSAGE = '[DONE]' as const;
export const SSE_LINE_DELIMETER = '\n\n' as const;

export type MessageRole = 'user' | 'assistant';

export interface Message {
  role: MessageRole;
  content: string;
}

export enum StreamMessageType {
  Token = 'token',
  Error = 'error',
  Connected = 'connected',
  Done = 'done',
  ToolStart = 'tool_start',
  ToolEnd = 'tool_end',
}

export interface BasestreamMessage {
  type: StreamMessageType;
}

export interface TokenMessage extends BasestreamMessage {
  type: StreamMessageType.Token;
  token: string;
}

export interface ErrorMessage extends BasestreamMessage {
  type: StreamMessageType.Error;
  error: string;
}

export interface ConnectedMessage extends BasestreamMessage {
  type: StreamMessageType.Connected;
}

export interface DoneMessage extends BasestreamMessage {
  type: StreamMessageType.Done;
}

export interface ToolStartMessage extends BasestreamMessage {
  type: StreamMessageType.ToolStart;
  tool: string;
  input: unknown;
}

export interface ToolEndMessage extends BasestreamMessage {
  type: StreamMessageType.ToolEnd;
  tool: string;
  output: unknown;
}

export type StreamMessage =
  | TokenMessage
  | ErrorMessage
  | ConnectedMessage
  | DoneMessage
  | ToolStartMessage
  | ToolEndMessage;

export interface ChatRequestBody {
  messages: Message[];
  newMessage: string;
  chatId: Id<'chats'>;
}
