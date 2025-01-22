import { memo } from 'react';

const MessageSkeleton = memo(({ isUser }: { isUser: boolean }) => (
  <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
    <div
      className={`w-2/3 rounded-2xl p-4 ${
        isUser
          ? 'bg-primary/10 rounded-br-none dark:bg-primary/20'
          : 'bg-card rounded-bl-none border border-border dark:bg-card/80'
      }`}
    >
      <div className="space-y-3">
        <div
          className={`h-4 animate-pulse rounded w-[90%] ${
            isUser
              ? 'bg-primary/20 dark:bg-primary/30'
              : 'bg-muted dark:bg-muted/80'
          }`}
        />
        <div
          className={`h-4 animate-pulse rounded w-[75%] ${
            isUser
              ? 'bg-primary/20 dark:bg-primary/30'
              : 'bg-muted dark:bg-muted/80'
          }`}
        />
        <div
          className={`h-4 animate-pulse rounded w-[60%] ${
            isUser
              ? 'bg-primary/20 dark:bg-primary/30'
              : 'bg-muted dark:bg-muted/80'
          }`}
        />
      </div>
    </div>
  </div>
));

MessageSkeleton.displayName = 'MessageSkeleton';

const Loading = () => {
  // Generate random number between 2 and 4 for better performance
  const numMessages = Math.floor(Math.random() * 3) + 2;

  return (
    <div className="flex-1 overflow-hidden bg-background dark:bg-background">
      {/* Messages section */}
      <div className="h-[calc(100vh-65px)] flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
          <div className="max-w-4xl mx-auto space-y-8">
            {[...Array(numMessages)].map((_, i) => (
              <MessageSkeleton key={i} isUser={i % 2 === 0} />
            ))}
          </div>
        </div>
        {/* Input section */}
        <div className="border-t border-border bg-background dark:bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="h-12 bg-muted dark:bg-muted/80 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
