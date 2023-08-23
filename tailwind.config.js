/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        light: {
          background: '#F5F7FA',
          text: '#333333',
          primary: '#54A4FF',
          secondary: '#FF6B88',
        },
        dark: {
          background: '#1A202C',
          text: '#E1E8F0',
          primary: '#5C9DFF',
          secondary: '#FF85A1',
        },
      },
    },
  },
  plugins: [],
};
