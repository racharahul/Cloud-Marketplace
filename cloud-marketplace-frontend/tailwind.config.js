/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Ensure Tailwind scans your components
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")], // Add forms plugin here
};
