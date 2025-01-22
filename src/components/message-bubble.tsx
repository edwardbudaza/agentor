'use client';

import { cn } from '@/lib/utils';
import { useUser } from '@clerk/clerk-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { BotIcon } from 'lucide-react';

interface MessageBubbleProps {
  content: string;
  isUser?: boolean;
}

const formatMessage = (content: string): string => {
  // First unescape backslashes
  content = content.replace(/\\\\/g, '\\');

  // Handle new lines
  content = content.replace(/\\n/g, '\n');

  // Remove only the markers but keep the content between them
  content = content.replace(/---START---\n?/g, '').replace(/\n?---END---/g, '');

  // Trim any extra whitespace that might be left
  return content.trim();
};

export const MessageBubble = ({ content, isUser }: MessageBubbleProps) => {
  const { user } = useUser();

  return (
    <div
      className={cn(
        'flex items-end gap-2',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={cn(
          'rounded-2xl px-4 py-2.5 max-w-[85%] md:max-w-[75%] shadow-sm relative',
          'transition-colors duration-200',
          isUser
            ? cn(
                'bg-primary text-primary-foreground rounded-br-none',
                'ring-1 ring-inset ring-primary/20'
              )
            : cn(
                'bg-card text-card-foreground rounded-bl-none',
                'ring-1 ring-inset ring-border',
                'dark:bg-card/80'
              )
        )}
      >
        <div className="whitespace-pre-wrap text-[15px] leading-relaxed">
          <div
            className={cn(
              'prose prose-sm max-w-none',
              'dark:prose-invert',
              isUser
                ? 'prose-p:text-primary-foreground prose-a:text-primary-foreground/90'
                : 'prose-p:text-card-foreground prose-a:text-foreground/90'
            )}
            dangerouslySetInnerHTML={{ __html: formatMessage(content) }}
          />
        </div>
        <div
          className={cn('absolute bottom-0', isUser ? '-right-10' : '-left-10')}
        >
          <div
            className={cn(
              'w-8 h-8 rounded-full',
              'ring-2 ring-background',
              'transition-shadow duration-200',
              'shadow-sm hover:shadow-md',
              isUser
                ? 'bg-background'
                : cn(
                    'bg-primary text-primary-foreground',
                    'dark:ring-background'
                  )
            )}
          >
            {isUser ? (
              <Avatar className="h-full w-full">
                <AvatarImage src={user?.imageUrl} />
                <AvatarFallback>
                  {user?.firstName?.charAt(0)}
                  {user?.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <BotIcon className="h-5 w-5" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
