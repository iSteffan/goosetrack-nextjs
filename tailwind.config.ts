import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',

  content: [
    './src/sections/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '375px',
      md: '768px',
      xl: '1440px',
    },

    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '20px',
          sm: '20px',
          md: '32px',
          xl: '128px',
        },
      },
      fontWeight: {
        // '300': '300',
        // '400': '400',
        '500': '500',
        '600': '600',
        '700': '700',
      },
      lineHeight: {
        normal: 'normal',
      },
      colors: {
        blueMain: '#3E85F3',
        blueAccent: '#2B78EF',
        blueLight: '#DCEBF7',
      },
    },
  },
  plugins: [],
} satisfies Config;
