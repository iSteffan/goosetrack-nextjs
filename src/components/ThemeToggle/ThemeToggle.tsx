'use client';

import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <div>
      <button
        onClick={() => setTheme('light')}
        className="rounded-md bg-gray-200 p-2 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
      >
        light
      </button>
      <button
        onClick={() => setTheme('dark')}
        className="rounded-md bg-gray-200 p-2 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
      >
        dark
      </button>
    </div>
  );
}
