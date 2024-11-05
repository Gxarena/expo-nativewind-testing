/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "app/index.js",
    "./app/**/*.{js,jsx,ts,tsx}",        // Includes all files in the "app" directory
    "./components/**/*.{js,jsx,ts,tsx}", // Includes all files in the "components" directory
    "./hooks/**/*.{js,jsx,ts,tsx}",      // Includes all files in the "hooks" directory
    "./app-example/**/*.{js,jsx,ts,tsx}" // Includes all files in the "app-example" directory, if needed
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
