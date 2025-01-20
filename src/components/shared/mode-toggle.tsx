'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [checked, setChecked] = useState(theme === 'dark');

  const handleToggle = () => {
    setChecked((prev) => !prev);
    setTheme(checked ? 'light' : 'dark');
  };

  return (
    <div className="flex items-center justify-center">
      <label
        htmlFor="theme-toggle"
        className="relative flex items-center cursor-pointer"
      >
        <input
          type="checkbox"
          id="theme-toggle"
          className="sr-only"
          checked={checked}
          onChange={handleToggle}
        />
        <div className="w-14 h-8 bg-muted rounded-full shadow-inner dark:bg-muted-foreground flex items-center">
          <div
            className={`absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-foreground rounded-full shadow transition-all ${
              checked ? 'translate-x-6' : 'translate-x-1'
            } flex items-center justify-center`}
          >
            {checked ? (
              <Moon className="h-4 w-4 text-muted" />
            ) : (
              <Sun className="h-4 w-4 text-muted" />
            )}
          </div>
        </div>
      </label>
    </div>
  );
}
