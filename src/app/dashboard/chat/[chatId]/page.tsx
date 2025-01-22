import { auth } from '@clerk/nextjs/server';
import { Id } from '../../../../../convex/_generated/dataModel';
import { redirect } from 'next/navigation';
import { getConvexClient } from '@/lib/convex';
import { api } from '../../../../../convex/_generated/api';
import { ChatInterface } from '@/components/chat-interface';

interface ChatPageProps {
  params: Promise<{
    chatId: Id<'chats'>;
  }>;
}

const ChatPage = async ({ params }: ChatPageProps) => {
  const { chatId } = await params;

  //Get user authentication
  const { userId } = await auth();

  if (!userId) {
    redirect('/');
  }

  try {
    // Get Convex client anf fetch chat and messages
    const convex = getConvexClient();

    //Check if the chat exixts & user is authorized to view it
    const chat = await convex.query(api.chats.getChat, {
      id: chatId,
      userId,
    });

    if (!chat) {
      console.log('Chat not found or unauthorized, redirecting to dashboard');
      redirect('/dashboard');
    }

    // get messages
    const initialMessages = await convex.query(api.messages.list, { chatId });

    return (
      <div className="flex-1 overflow-hidden">
        <ChatInterface chatId={chatId} initialMessages={initialMessages} />
      </div>
    );
  } catch (error) {
    console.error('Error loading chat: ', error);
    redirect('/dashboard');
  }
};
export default ChatPage;
