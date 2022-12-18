/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'subBackGround':'#1E2329',
        'background':'#1A1E23',
        'black':'#030405',
        'grey':'#505045',
        'green':'#3C8C47',
        'darkGreen':'#889C84'
      },
      height:{
        'intro':'28rem',
        'registration':'95vh'
      }
    },
    
  },
  plugins: [],
}
