/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sky: {
          brand: '#009BDE',
          light: '#9ACAEB',
          dark: '#9ACAEB',
        },
        navy: {
          DEFAULT: '#002E6D',
          dark: '#002E6D',
          light: '#002E6D',
        },
        gold: {
          DEFAULT: '#F5A800',
          light: '#FFB92E',
        },
        seaBlue: {
          100: '#002E6D',
          80:  '#1A4B8D',
        },
        skyBlue: {
          100: '#009BDE',
          80:  '#33AEE5',
        },
        sunray: {
          100: '#FFC627',
        },
        sunset: {
          100: '#EE7523',
        },
        aqua: {
          100: '#54BBAB',
        },
        surface: '#F8FAFC',
      },
      fontFamily: {
        verlag: ['Verlag Black', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      backgroundImage: {
        'diagonal-brand': 'linear-gradient(135deg, #009BDE 0%, #009BDE 45%, #ffffff 45%, #ffffff 55%, #002E6D 55%, #002E6D 100%)',
      },
    },
  },
  plugins: [],
}
