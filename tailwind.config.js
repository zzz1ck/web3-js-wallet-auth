const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/!(*.test|*.stories).{js,jsx}"],
  darkMode: "class",
  // prefix: "tw-",
  important: true,
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        dark: "#0E0C31",
        medium: "#4A495A",
        light: "#706F7B",
        white: "#FFFFFF",
        gray: {
          100: "#FAFAFA",
          200: "#F4F5F5",
          300: "#E7E8E9",
          400: "#D5DADC",
          500: "#B6BCC6",
          600: "#A4A6AD",
          700: "#706F7B",
          800: "#4A495A",
          900: "#0E0C31",
        },
        leaf: {
          100: "#EBFFF9",
          300: "#C3FEEC",
          500: "#04F2AB",
          DEFAULT: "#04F2AB",
          700: "#03BF87",
        },
        error: {
          DEFAULT: "#DB1A1A",
          dark: "#DB1A1A",
          light: "#FDF1F1",
        },
        warning: {
          DEFAULT: "#C0420C",
          dark: "#C0420C",
          light: "#FDF2ED",
        },
        success: {
          DEFAULT: "#008040",
          dark: "#008040",
          light: "#DFFBE6",
        },
      },
    },
  },
  plugins: [],
};
