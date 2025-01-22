import { BotIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const DashboardPage = () => {
  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="relative max-w-2xl w-full">
        {/* Decorative elements */}
        <div
          className={cn(
            'absolute inset-0 -z-10 rounded-3xl',
            'bg-gradient-to-r from-gray-100 to-gray-50/50',
            'dark:from-gray-900 dark:to-gray-800/50'
          )}
        ></div>
        <div
          className={cn(
            'absolute inset-0 -z-10 rounded-3xl',
            'bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)]',
            'dark:bg-[linear-gradient(to_right,#333333_1px,transparent_1px),linear-gradient(to_bottom,#333333_1px,transparent_1px)]',
            'bg-[size:4rem_4rem]'
          )}
        ></div>

        <div className="relative space-y-6 p-8 text-center">
          <div
            className={cn(
              'bg-white/60 dark:bg-gray-900/60',
              'backdrop-blur-sm',
              'shadow-sm dark:shadow-gray-950/50',
              'ring-1 ring-gray-200/50 dark:ring-gray-700/50',
              'rounded-2xl p-6 space-y-4'
            )}
          >
            <div
              className={cn(
                'bg-gradient-to-b',
                'from-gray-50 to-white',
                'dark:from-gray-800 dark:to-gray-900',
                'rounded-xl p-4 inline-flex'
              )}
            >
              <BotIcon className="w-12 h-12 text-gray-600 dark:text-gray-300" />
            </div>

            <h2
              className={cn(
                'text-2xl font-semibold',
                'bg-gradient-to-br',
                'from-gray-900 to-gray-600',
                'dark:from-gray-100 dark:to-gray-400',
                'bg-clip-text text-transparent'
              )}
            >
              Your Intelligent Assistant Awaits
            </h2>

            <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
              Choose from your past conversations or begin a fresh dialogue.
              Your personal AI companion is equipped to tackle any challenge.
            </p>

            <div className="pt-2 flex justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400"></div>
                Instant Replies
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500 dark:bg-green-400"></div>
                Adaptive Learning
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-purple-500 dark:bg-purple-400"></div>
                Advanced Features
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
