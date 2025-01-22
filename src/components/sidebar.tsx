import { useMutation, useQuery } from 'convex/react';
import { useRouter } from 'next/navigation';
import { PlusIcon } from 'lucide-react';
import { use } from 'react';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { NavigationContext } from '@/components/providers/navigation-provider';
import { ChatRow } from '@/components/chat-row';
import { api } from '../../convex/_generated/api';
import { Id } from '../../convex/_generated/dataModel';

export const Sidebar = () => {
  const router = useRouter();
  const { closeMobileNav, isMobileNavOpen } = use(NavigationContext);

  const chats = useQuery(api.chats.listChats);
  const createChat = useMutation(api.chats.createChat);
  const deleteChat = useMutation(api.chats.deleteChat);

  const handleClick = () => {
    router.push('/dashboard/chat');
    closeMobileNav();
  };

  const handleNewChat = async () => {
    const chatId = await createChat({ title: 'New Chat' });
    router.push(`/dashboard/chat/${chatId}`);
    closeMobileNav();
  };

  const handleDeleteChat = async (id: Id<'chats'>) => {
    await deleteChat({ id });
    // If we're currently viewing this chat, redirect to dashboard
    if (window.location.pathname.includes(id)) {
      router.push('/dashboard');
    }
  };

  return (
    <>
      {isMobileNavOpen && (
        <div
          className="fixed inset-0 bg-black/20 dark:bg-black/50 z-40 md:hidden"
          onClick={closeMobileNav}
        />
      )}
      <div
        className={cn(
          'fixed md:inset-y-0 top-14 bottom-0 left-0 z-50 w-72',
          'bg-white dark:bg-gray-900',
          'backdrop-blur-xl',
          'border-r border-gray-200 dark:border-gray-800',
          'transform transition-all duration-300 ease-in-out',
          'md:relative md:translate-x-0 md:top-0',
          'flex flex-col',
          'shadow-sm dark:shadow-gray-950/50',
          isMobileNavOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="p-4 border-b border-gray-200/50 dark:border-gray-800">
          <Button
            onClick={handleNewChat}
            className={cn(
              'w-full',
              'bg-white dark:bg-gray-800',
              'hover:bg-gray-50 dark:hover:bg-gray-700',
              'text-gray-700 dark:text-gray-200',
              'border border-gray-200 dark:border-gray-700',
              'shadow-sm hover:shadow',
              'transition-all duration-200'
            )}
          >
            <PlusIcon className="mr-2 h-4 w-4" /> New Chat
          </Button>
        </div>

        <div
          className={cn(
            'flex-1 overflow-y-auto p-4',
            'space-y-2.5',
            'scrollbar-thin',
            'scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700',
            'scrollbar-track-transparent',
            'hover:scrollbar-thumb-gray-300 dark:hover:scrollbar-thumb-gray-600'
          )}
        >
          {chats?.map((chat) => (
            <ChatRow key={chat._id} chat={chat} onDelete={handleDeleteChat} />
          ))}
        </div>
      </div>
    </>
  );
};
