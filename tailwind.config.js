/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '500px',
      },
      colors: {
        purple: {
          lightest: '#9966CC',
          light: '#8052B3',
          DEFAULT: '#663399',
          dark: '#4D2673',
          darkest: '#331A4D',
        },
        accent: {
          lime: '#99CC33',
          orange: '#FFB347',
          red: '#FF6B6B',
          green: '#4CAF50',
        },
      },
    },
  },
  plugins: [],
};
