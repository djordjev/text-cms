import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      'primary-100': '#003EB3',
      'primary-300': '#0074F0',
      'primary-500': '#14A9FF',
      'primary-700': '#85DCFF',
      'success-300': '#199033',
      'success-500': '#32A94C',
      'success-700': '#4CC366',
      white: '#FFFFFF',
      black: '#000000',
      gray: {
        9: '#191919',
        8: '#333333',
        7: '#4C4C4C',
        6: '#666666',
        5: '#7F7F7F',
        4: '#999999',
        3: '#B2B2B2',
        2: '#CCCCCC',
        1: '#EFEFEF',
        0: '#F6F6F6'
      }
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    spacing: {
      '0': '0',
      '1x': '8px',
      '1xs': '4px',
      '2x': '16px',
      '2xs': '12px',
      '3x': '24px',
      '3xs': '20px',
      '4x': '32px',
      '4xs': '28px',
      '5x': '40px',
      '5xs': '36px',
      '6x': '48px',
      '6xs': '44px',
      '7x': '56px',
      '7xs': '52px',
      '8x': '64px',
      '8xs': '60px',
      '9x': '72px',
      '9xs': '68px',
      '10x': '80px',
      '10xs': '76px',
      '1z': '100px',
      '2z': '200px',
      '3z': '400px',
      '4z': '800px',
      '5z': '1200px',
      '6z': '1600px'
    }
  },
  plugins: [],
  prefix: 'u-'
} satisfies Config;
