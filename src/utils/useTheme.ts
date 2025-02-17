// 'use client';

// import { useEffect, useState } from 'react';
// import Cookies from 'js-cookie';

// export function useTheme() {
//   const [theme, setTheme] = useState<'light' | 'dark'>(() => {
//     if (typeof document !== 'undefined') {
//       return document.documentElement.getAttribute('data-theme') as
//         | 'light'
//         | 'dark';
//     }
//     return 'light'; // Значення за замовчуванням
//   });

//   const [hydrated, setHydrated] = useState(false);

//   useEffect(() => {
//     setHydrated(true);
//   }, []);

//   useEffect(() => {
//     if (hydrated) {
//       document.documentElement.setAttribute('data-theme', theme);
//       Cookies.set('theme', theme, { expires: 365 });
//     }
//   }, [theme, hydrated]);

//   const toggleTheme = () => {
//     setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
//   };

//   return { theme, toggleTheme, hydrated };
// }
