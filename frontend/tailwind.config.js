/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#10b981', // Emerald
          600: '#059669',
          900: '#064e3b',
        },
        dark: {
          bg: '#0f172a',    // Slate 900
          card: '#1e293b',  // Slate 800
          border: '#334155',// Slate 700
          text: '#f8fafc',  // Slate 50
        }
      }
    },
  },
  plugins: [],
}
