/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'aurebesh': ['Aurebesh', 'sans-serif'],
      },
      colors: {
        'star-wars-yellow': '#FFE81F',
        'star-wars-blue': '#4A90E2',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
