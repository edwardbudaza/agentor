import { useRouter } from 'next/navigation';
import { use } from 'react';
import { TrashIcon } from 'lucide-react';
import TimeAgo from 'react-timeago';

import { Doc, Id } from '../../convex/_generated/dataModel';
import { NavigationContext } from '@/components/providers/navigation-provider';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

type Props = {
  chat: Doc<'chats'>;
  onDelete: (id: Id<'chats'>) => void;
};

export const ChatRow = ({ chat, onDelete }: Props) => {
  const router = useRouter();
  const { closeMobileNav } = use(NavigationContext);
  const lastMessage = useQuery(api.messages.getLastMessage, {
    chatId: chat._id,
  });

  const handleClick = () => {
    router.push(`/dashboard/chat/${chat._id}`);
    closeMobileNav();
  };

  return (
    <div
      className={cn(
        'group rounded-xl',
        'border border-gray-200/30 dark:border-gray-700/30',
        'bg-white/50 dark:bg-gray-800/50',
        'hover:bg-white/80 dark:hover:bg-gray-800/80',
        'backdrop-blur-sm',
        'transition-all duration-200',
        'cursor-pointer',
        'shadow-sm hover:shadow-md dark:shadow-gray-950/50',
        'relative'
      )}
      onClick={handleClick}
    >
      <div className="p-4">
        <div className="flex justify-between items-start">
          <p className="text-sm text-gray-600 truncate flex-1 font-medium">
            {lastMessage ? (
              <>
                {lastMessage.role === 'user' ? 'You: ' : 'AI: '}
                {lastMessage.content.replace(/\\n/g, '\n')}
              </>
            ) : (
              <span className="text-gray-400">New conversation</span>
            )}
          </p>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'opacity-0 group-hover:opacity-100',
              '-mr-2 -mt-2 ml-2',
              'transition-all duration-200',
              'hover:bg-gray-100/50 dark:hover:bg-gray-700/50'
            )}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(chat._id);
            }}
          >
            <TrashIcon
              className={cn(
                'h-4 w-4',
                'text-gray-400 dark:text-gray-500',
                'hover:text-red-500 dark:hover:text-red-400',
                'transition-colors duration-200'
              )}
            />
          </Button>
        </div>

        {lastMessage && (
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5 font-medium">
            <TimeAgo date={lastMessage.createdAt} />
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatRow;
