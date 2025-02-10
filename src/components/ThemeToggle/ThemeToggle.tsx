'use client';

import { useTheme } from '@/utils/useTheme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="rounded-md bg-gray-200 p-2 text-black dark:bg-gray-800 dark:text-white"
    >
      {theme === 'dark' ? '🌙 Темна' : '☀️ Світла'}
    </button>
  );
}
