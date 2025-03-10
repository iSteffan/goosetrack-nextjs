// 'use client';

// import { useTheme } from 'next-themes';

// import MoonIcon from '@/public/icon/moon.svg';
// import SunIcon from '@/public/icon/sun.svg';

// export function ThemeToggle() {
//   const { setTheme, theme } = useTheme();
//   // console.log('theme', theme);

//   const isDark = theme === 'dark';

//   return (
//     <button
//       type="button"
//       onClick={() => setTheme(isDark ? 'light' : 'dark')}
//       className="group ml-[18px] mr-[8px] md:ml-[24px] md:mr-[14px]"
//     >
//       {isDark ? (
//         <SunIcon className="h-[24px] w-[24px] fill-blueMain transition-colors group-hover:stroke-blueAccent md:h-[32px] md:w-[32px]" />
//       ) : (
//         <MoonIcon className="h-[24px] w-[24px] fill-blueMain transition-colors group-hover:stroke-blueAccent md:h-[32px] md:w-[32px]" />
//       )}
//     </button>
//   );
// }

'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import MoonIcon from '@/public/icon/moon.svg';
import SunIcon from '@/public/icon/sun.svg';

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Уникнення hydration mismatch

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="group ml-[18px] mr-[8px] md:ml-[24px] md:mr-[14px]"
    >
      {isDark ? (
        <SunIcon className="h-[24px] w-[24px] fill-blueMain transition-colors group-hover:stroke-blueAccent md:h-[32px] md:w-[32px]" />
      ) : (
        <MoonIcon className="h-[24px] w-[24px] fill-blueMain transition-colors group-hover:stroke-blueAccent md:h-[32px] md:w-[32px]" />
      )}
    </button>
  );
}
