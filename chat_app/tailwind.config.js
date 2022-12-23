/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation:{
        'changeColor':' changeColor 15s ease infinite'
      },
      backgroundSize:{
        '400%':'500% 500%'
      },
      keyframes:{
        'changeColor':{
          '0%': {backgroundPosition: '0% 50%'},
          
        

          '50%': { backgroundPosition: '50% 100%'},

         

          '100%':{ backgroundPosition: '0% 50%'},
        }
      },
      backgroundImage:{
        'gradient':' radial-gradient(circle, rgba(15,23,42,1) 0%, rgba(14,31,50,0.9596171232164741) 15%, rgba(12,40,60,0.9568160027682948) 26%, rgba(10,50,70,0.9344070391828606) 39%, rgba(8,62,82,0.9232025573901436) 52%, rgba(6,72,92,0.9204014369419643) 61%, rgba(4,83,104,0.8895891120119923) 78%, rgba(0,105,127,0.7999532576702556) 100%);',

      },
      colors:{
        'subBackGround':'#1C242D',
        'background':'#1A1E23',
        'black':'#030405',
        'grey':'#505045',
        'green':'#3C8C47',
        'darkGreen':'#889C84'
      },
      height:{
        'intro':'28rem',
        'registration':'95vh',
        'home-screen':'93vh',
        'home-content':'91%'
      }
    },
    
  },
  plugins: [],
}
