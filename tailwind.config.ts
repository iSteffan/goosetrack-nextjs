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

      smOnly: { max: '767.98px' },
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
        '400': '400',
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
        bluePale: '#E3F3FF',

        grayLight: '#DCE3E5',
        inputBorder: 'rgba(220, 227, 229, 0.60)',

        error: '#E74A3B',
        greenCorrect: '#3CBC81',

        blackCustom: '#111',
        blackBg: '#13151A',

        grayCustom: 'rgba(52, 52, 52, 0.50)',
        grayTheme: 'rgba(250, 250, 250, 0.30)',
        grayBg: '#F7F6F9;',
      },
    },
  },
  plugins: [],
} satisfies Config;
