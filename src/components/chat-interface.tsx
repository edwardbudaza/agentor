'use client';

import { useEffect, useRef, useState } from 'react';
import { Doc, Id } from '../../convex/_generated/dataModel';
import { WelcomeMessage } from '@/components/welcome-message';
import { MessageBubble } from './message-bubble';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChatRequestBody, StreamMessageType } from '@/lib/types';
import { createSSEParser } from '@/lib/sse-parser';
import { getConvexClient } from '@/lib/convex';
import { api } from '../../convex/_generated/api';

interface ChatInterfaceProps {
  chatId: Id<'chats'>;
  initialMessages: Doc<'messages'>[];
}

export const ChatInterface = ({
  chatId,
  initialMessages,
}: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Doc<'messages'>[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamedResponse, setStreamedResponse] = useState('');
  const [currentTool, setCurrentTool] = useState<{
    name: string;
    input: unknown;
  } | null>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamedResponse]);

  const formatToolOutput = (output: unknown): string => {
    if (typeof output === 'string') return output;
    return JSON.stringify(output, null, 2);
  };

  const formatTerminalOutput = (
    tool: string,
    input: unknown,
    output: unknown
  ) => {
    const terminalHtml = `
      <div class="bg-gray-100 dark:bg-[#1e1e1e] text-black dark:text-white font-mono p-2 rounded-md my-2 overflow-x-auto whitespace-normal max-w-[600px]">
        <div class="flex items-center gap-1.5 border-b border-gray-300 dark:border-gray-700 pb-1">
          <span class="text-red-500">●</span>
          <span class="text-yellow-500">●</span>
          <span class="text-green-500">●</span>
          <span class="text-gray-500 dark:text-gray-400 ml-1 text-sm">~/${tool}</span>
        </div>
        <div class="text-gray-600 dark:text-gray-400 mt-1">$ Input</div>
        <pre class="text-yellow-600 dark:text-yellow-400 mt-0.5 whitespace-pre-wrap overflow-x-auto">${formatToolOutput(input)}</pre>
        <div class="text-gray-600 dark:text-gray-400 mt-2">$ Output</div>
        <pre class="text-green-600 dark:text-green-400 mt-0.5 whitespace-pre-wrap overflow-x-auto">${formatToolOutput(output)}</pre>
      </div>`;

    return `---START---\n${terminalHtml}\n---END---`;
  };

  /**
   * Processes a ReadableStream from the SSE response.
   * This function continuously reads chunks of data from the stream until it's done.
   * Each chunk is decoded from Uint8Array to string and passed to the callback.
   */

  const processStream = async (
    reader: ReadableStreamDefaultReader<Uint8Array>,
    onChunk: (chunk: string) => Promise<void>
  ) => {
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        await onChunk(new TextDecoder().decode(value));
      }
    } finally {
      reader.releaseLock();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    // Reste UI state for new message
    setInput('');
    setStreamedResponse('');
    setCurrentTool(null);
    setIsLoading(true);

    // Add user's message immediately for better UX
    const optimisticUserMessage: Doc<'messages'> = {
      _id: `temp_${Date.now()}`,
      chatId,
      content: trimmedInput,
      role: 'user',
      createdAt: Date.now(),
    } as Doc<'messages'>;

    setMessages((prev) => [...prev, optimisticUserMessage]);

    // Track complete response for saving to database
    let fullResponse = '';

    try {
      // Prepare chat history and new message for API
      const requestBody: ChatRequestBody = {
        messages: messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
        newMessage: trimmedInput,
        chatId,
      };

      // Initialize SSE connection
      const response = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) throw new Error(await response.text());
      if (!response.body) throw new Error('No response body available');

      // Create SSE parser and stream reader
      const parser = createSSEParser();
      const reader = response.body.getReader();

      // Process the stream chunks
      await processStream(reader, async (chunk) => {
        // Parse SSE messages from the chunck
        const messages = parser.parse(chunk);

        // Handle each message based on its type
        for (const message of messages) {
          switch (message.type) {
            case StreamMessageType.Token:
              // Handle streaming tokens (normal text response)
              if ('token' in message) {
                fullResponse += message.token;
                setStreamedResponse(fullResponse);
              }
              break;

            case StreamMessageType.ToolStart:
              // Handle start of tool execution (e.g API calls, file operations)
              if ('tool' in message) {
                setCurrentTool({
                  name: message.tool,
                  input: message.input,
                });
                fullResponse += formatTerminalOutput(
                  message.tool,
                  message.input,
                  'Processing...'
                );
                setStreamedResponse(fullResponse);
              }
              break;

            case StreamMessageType.ToolEnd:
              // Handle completion of tool execution
              if ('tool' in message && currentTool) {
                // Replace the "Processing..." message with actual output
                const lastTerminalIndex = fullResponse.lastIndexOf(
                  '<div class=bg-[#1e1e1e]'
                );
                if (lastTerminalIndex !== -1) {
                  fullResponse =
                    fullResponse.substring(0, lastTerminalIndex) +
                    formatTerminalOutput(
                      message.tool,
                      currentTool.input,
                      message.output
                    );
                  setStreamedResponse(fullResponse);
                }
                setCurrentTool(null);
              }
              break;

            case StreamMessageType.Error:
              // Handle error messages from the stream
              if ('error' in message) {
                throw new Error(message.error);
              }
              break;

            case StreamMessageType.Done:
              //Handle completion of the entire response
              const assistantMessage: Doc<'messages'> = {
                _id: `temp_assiatnt_${Date.now()}`,
                chatId,
                content: fullResponse,
                role: 'assistant',
                createdAt: Date.now(),
              } as Doc<'messages'>;

              // Save the complete message to the database
              const convex = getConvexClient();
              await convex.mutation(api.messages.store, {
                chatId,
                content: fullResponse,
                role: 'assistant',
              });

              setMessages((prev) => [...prev, assistantMessage]);
              setStreamedResponse('');
              return;
          }
        }
      });
    } catch (error) {
      // Handle any errors during streaming
      console.error('Error sending message: ', error);
      // Remove the optimistic user message if the was an error
      setMessages((prev) =>
        prev.filter((msg) => msg._id !== optimisticUserMessage._id)
      );
      setStreamedResponse(
        formatTerminalOutput(
          'error',
          'Failed to process message',
          error instanceof Error ? error.message : 'Unknown error'
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-col h-[calc(100vh-theme(spacing.14))]">
      {/* Message container */}
      <section className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-800 p-2 md:p-0">
        <div className="max-w-4xl mx-auto p-4 space-y-3">
          {messages?.length === 0 && <WelcomeMessage />}
          {messages?.map((message: Doc<'messages'>) => (
            <MessageBubble
              content={streamedResponse}
              key={message._id}
              isUser={message.role === 'user'}
            />
          ))}
          {streamedResponse && <MessageBubble content={streamedResponse} />}
          {/* Loading indicator */}
          {isLoading && !streamedResponse && (
            <div className="flex justify-start animate-in fade-in-0">
              <div className="rounded-2xl px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-bl-none shadow-sm ring-1 ring-inset ring-gray-200 dark:ring-gray-600">
                <div className="flex items-center gap-1.5">
                  {[0.3, 0.15, 0].map((delay, i) => (
                    <div
                      className="h-1.5 w-1.5 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce"
                      key={i}
                      style={{ animationDelay: `-${delay}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={messageEndRef} />
        </div>
      </section>

      {/* Input form */}
      <footer className="border-t bg-white dark:bg-gray-900 p-4">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto relative">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message AI Agent..."
              className="flex-1 py-3 px-4 rounded-2xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12 bg-gray-50 dark:bg-gray-800 placeholder:text-gray-500 dark:placeholder:text-gray-400 text-gray-900 dark:text-gray-200"
            />
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className={cn(
                'absolute right-1.5 rounded-xl h-9 w-9 p-0 flex items-center justify-center transition-all',
                input.trim()
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
              )}
            >
              <ArrowRight />
            </Button>
          </div>
        </form>
      </footer>
    </main>
  );
};
