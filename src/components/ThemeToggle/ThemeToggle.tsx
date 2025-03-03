'use client';

import { useTheme } from 'next-themes';

import MoonIcon from '@/public/icon/moon.svg';
import SunIcon from '@/public/icon/sun.svg';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  console.log('theme', theme);

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className=""
    >
      {isDark ? (
        <SunIcon className="h-[24px] w-[24px] fill-blueMain md:h-[32px] md:w-[32px]" />
      ) : (
        <MoonIcon className="h-[24px] w-[24px] fill-blueMain md:h-[32px] md:w-[32px]" />
      )}
    </button>
  );
}
