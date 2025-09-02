/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FFFEF7',
        warmBrown: '#5D4037',
        sage: '#4A7C59',
        softPink: '#FFB6C1',
        card: {
          lavender: '#E6E6FA',
          mint: '#F0FFF0',
          peach: '#FFEEE6',
          sky: '#E0F6FF',
          rose: '#FFE4E6',
          butter: '#FFFACD',
          lilac: '#F0E6FF',
          seafoam: '#E6FFF9',
          coral: '#FFE6E0',
          lemon: '#FFFEE6',
          blush: '#FFE6F2',
          sage: '#E6F2E6'
        }
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
        handwritten: ['Dancing Script', 'cursive']
      },
      rotate: {
        '1': '1deg',
        '2': '2deg',
        '3': '3deg',
        '-1': '-1deg',
        '-2': '-2deg',
        '-3': '-3deg'
      }
    },
  },
  plugins: [],
};