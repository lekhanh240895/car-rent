import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3563E9',
        secondary: '#54A6FF',
        background: '#F6F7F9',
        borderColor: '#C3D4E966',
        subTextColor: '#90A3BF',
        textColor: '#596780'
      },
      boxShadow: {
        card: 'rgba(50, 50, 93, 0.25) 0px 5px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px'
      },
      screens: {
        '2xl': '1440px'
      },
      keyframes: {
        shimmer: {
          '100%': {
            transform: 'translateX(100%)'
          }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar-hide'),
    require('tailwindcss-textshadow')
  ]
};
export default config;
