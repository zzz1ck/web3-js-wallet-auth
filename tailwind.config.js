const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/!(*.test|*.stories).{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
