/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}', //pages안에 있는 파일들이 모두 적용되게하겠다는뜻
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        mainblue: '#0084FF',
        secondblue: '#067fefc2',
        ThemeGray1: '#525252',
      },
    },
  },
  plugins: [],
};
