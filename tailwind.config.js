/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        amber: {
          500: '#E8851A',
          600: '#d4751a',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}