/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        budvar: {
          gold: '#D4AF37',
          'gold-dark': '#B8941F',
          cream: '#F5F5DC',
          brown: '#8B4513',
        },
      },
    },
  },
  plugins: [],
}
