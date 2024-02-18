/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      md: '640px'
    },
    fontFamily: {
      sans: ['Nunito Sans', 'sans-serif']
    },
    extend: {
      colors:{
        blue:{
        }
      }
    }
  }
}
