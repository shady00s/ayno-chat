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
        'gradient':' radial-gradient(circle,rgba(49,141,255,1),rgba(131,137,187,1) ,rgba(173,74,250,0.7));',

      },
      colors:{
        'theme':'rgba(8,8,8,0.7)',
        'subBackGround':'rgba(53,58,65,0.14)',
        'background':'rgb(14,18,19)',
        'black':'#030405',
        'grey':'#505045',
        
        'darkGreen':'#889C84'
      },
      height:{
        'intro':'28rem',
        'registration':'95vh',
        'home-screen':'89vh',
        'home-content':'91%',
        'mobile-height':'80vh'
      },
      width:{
        'personal-info':'20rem',
        'avatar-info':'32rem',
      }
    },
    
  },
  plugins: [],
}
