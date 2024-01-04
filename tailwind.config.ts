import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        breath: {
          '0%': { transform: 'scale(0.4)' },
          '40%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0.4)' },
        },
        bounce: {
          '0%, 100%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
          '50%': {
            transform: 'translateY(-25%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
        },
      },
      animation: {
        'breath-slow': 'breath 10s ease-in-out infinite',
        'bounce-fast': 'bounce 0.6s ease-in-out 3',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
export default config;
