/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        trustred: {
          50: '#fff1f2',
          100: '#ffe4e6',
          500: '#e11d48',
          600: '#c80d1e',
          700: '#a80b18', // Primary Blood Trust Dark Red (Matches reference image)
          800: '#880813',
          900: '#6d050d',
        },
        blood: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#c80d1e',
          700: '#a80b18',
          800: '#880813',
          900: '#6d050d',
          950: '#4c0519',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
