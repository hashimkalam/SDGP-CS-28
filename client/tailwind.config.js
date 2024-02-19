/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#090e34',
      },
      screens: {
        xxs: "320px",
      },
    },
  },
  plugins: [],
};
