import SubmitButton from "../components/submit_button"
import RegistrationComponent from "../components/registeration_component"
import SignInComponent from "../components/signin_component"
import { useState ,useMemo} from 'react';
import RegisterScreenContext from "../../context/registrationContext";
import {logo} from '../../constants'
export default function IntroScreen() {

    
 const [screen,setScreen] = useState("main")

 const RegistrationScreenValue = useMemo(()=>({screen,setScreen}),[screen,setScreen])
    return (<>
        {/* main container */}
        <main className="w-full h-screen overflow-hidden flex justify-center items-center  animate-changeColor bg-400% bg-gradient">

            <RegisterScreenContext.Provider value={RegistrationScreenValue}>

           
            {/* registeration container */}
            <div className={` ${screen === 'sign-in'?" md:w-4/12 h-[74%] w-10/12":screen === 'register'?"md:h-[73%]":"md:h-[63%] h-[83%]"}  w-[80%] transition-all duration-300 ease bg-background relative p-4  pb-2 m-auto overflow-hidden rounded-3xl `}>
                <div>
                    <img className="w-36 m-6" src={logo} />
                </div>
        {/* main screen */}

                <div className={`${screen ==='sign-in'?"overflow-y-hidden items-end":"overflow-y-auto"}    overflow-hidden `}>
                 {/* intro section */}
                <section className={`${screen === 'main' ? " translate-x-0":" -translate-x-[-99999px] w-0 h-0 hidden"} md:overflow-hidden overflow-y-scroll  transition-transform duration-300 ease-in flex justify-center items-center flex-wrap md:h-full   h-[75vh]`}>
                    <div className="flex flex-col md:border-b-0   border-b-2 border-b-slate-700 md:border-b-slate-700 items-center md:w-6/12 w-11/12 md:border-r-2 md:border-r-slate-700 p-2 ml-4  m-auto md:h-4/5">
                        <h1 className="text-3xl  xl:text-6xl md:p-4 p-8 text-slate-300">
                            Chat any one with no information needed.
                        </h1>
                        <span className="text-slate-500 p-8">No email or phone number needed just write your nickname and set password and chat with anoynus people</span>

                    </div>

                    {/* signup and registration section */}
                    <div className="p-10  w-full  md:w-5/12">
                        <h3 className="text-slate-400 pt-3 pb-5">Sign in if you already have account</h3>
                        <SubmitButton future={false} onClick={()=>{setScreen("sign-in")}} className={'bg-slate-800 mb-5 w-full'} title={"Sign-in"} />
                        <h3 className="text-slate-400 pt-3 pb-5" >Don't have accout? then create one.</h3>
                            
                            <SubmitButton future={false} className={'bg-slate-800 w-full'} title={"Register"} onClick={()=>{setScreen("register")}}/>

                           
                    </div>
                </section>

                <div className="w-full h-[60vh]  overflow-y-hidden">

               
                {/* sign in screen */}
                <section className={`${screen === 'sign-in' ? "translate-x-0 w-full h-full":"translate-x-[9999px] w-0 h-0 "}  transition-transform duration-300   flex justify-center items-center  overflow-y-auto`}>
                  
                    <SignInComponent/>

                 
                </section>
                {/* register screen */}

                <section className={`${screen === 'register' ? "opacity-100 translate-x-0 w-full h-full ":"-translate-x-[-9999px] w-0 h-0 invisible "} pb-2 transition-all duration-300 overflow-y-auto overflow-x-hidden `}>
                
                  <RegistrationComponent/>


                 

                   
                </section>
                </div>
                </div>
                
            </div>
            </RegisterScreenContext.Provider>
        </main>
    </>)
}



