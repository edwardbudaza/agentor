import { MessageSquare, Search, BookOpen, Code, Database } from 'lucide-react';

export const WelcomeMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full mt-10 ">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm ring-1 ring-inset ring-gray-200 dark:ring-gray-700 px-6 py-5 max-w-lg w-full">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Let's Work Together! 👋
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
          I'm your AI assistant, ready to help with:
        </p>
        <ul className="space-y-3 text-gray-600 dark:text-gray-300">
          <li className="flex items-start gap-3">
            <MessageSquare className="w-5 h-5 mt-1 text-blue-500 dark:text-blue-400" />
            <span>Natural conversations and brainstorming sessions</span>
          </li>
          <li className="flex items-start gap-3">
            <Search className="w-5 h-5 mt-1 text-blue-500 dark:text-blue-400" />
            <span>Analysis and problem-solving across various topics</span>
          </li>
          <li className="flex items-start gap-3">
            <BookOpen className="w-5 h-5 mt-1 text-blue-500 dark:text-blue-400" />
            <span>Writing and content creation assistance</span>
          </li>
          <li className="flex items-start gap-3">
            <Code className="w-5 h-5 mt-1 text-blue-500 dark:text-blue-400" />
            <span>Programming help and code explanations</span>
          </li>
          <li className="flex items-start gap-3">
            <Database className="w-5 h-5 mt-1 text-blue-500 dark:text-blue-400" />
            <span>Data analysis and organization</span>
          </li>
        </ul>
        <p className="text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">
          What would you like to explore today? I'm here to assist with any
          questions or tasks you have in mind.
        </p>
      </div>
    </div>
  );
};
