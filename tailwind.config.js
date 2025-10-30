/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // ← Importante: usa 'class' en lugar de 'media'
  theme: {
    extend: {},
  },
  plugins: [],
}