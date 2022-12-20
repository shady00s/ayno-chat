import SubmitButton from "./components/submit_button"
import RegistrationComponent from "./components/registeration_component"
import SignInComponent from "./components/signin_component"
import { useState } from 'react';

export default function IntroScreen(){

    const visibleContainer = "-translate-y-46 duration-400 transition-all ease-in"
    const hiddenContainer = "-translate-y-1/3 opacity-0 invisible  duration-300 transition-all ease-in"
    const [close,setClose]=useState(false) 
    return(<>
    <div className="bg-slate-800 xl:overflow-hidden    flex flex-col w-full flex-wrap  xl:flex-row">

        {/* intro container */}

        <div className="w-full h-intro   xl:h-screen xl:w-1/2  animate-changeColor bg-400% bg-gradient"> 
            <img src="/logo.png" className="p-2 mt-5"  alt="logo"/>

            <div className="relative m-auto top-1/4 p-3">
            <h1 className=" text-slate-200 text-3xl pb-2">
                Chat any one with no information needed.
            </h1>
            <span className="text-slate-400">No email or phone number needed just write your nickname and set password and chat with anoymous people</span>

            </div>
            
        </div>

        {/* registration and sign in main container  */}
        <div className="p-3 xl:w-1/2 flex flex-col justify-center items-center  overflow-none  relative   max-w-lg w-screen m-auto   " >

            {/* sign in container */}
            <div style={{height:"70%"}} className={`${close? hiddenContainer : visibleContainer} m-auto absolute justify-center flex flex-col items-center overflow-scroll md:h-full`}>
            <SignInComponent />
            <div className="w-full m-auto before:rounded-sm before:border-2 before:w-1/2 before:border-gray-600 after:border-2 after:rounded-sm  after:w-1/2 after:border-gray-600 flex justify-center items-center  ">
            
            <span className="pl-1 pr-1 text-white" >OR</span></div>
            {/* register show button */}
            <div className={close? hiddenContainer:null +" w-full xl:top-2/4 mt-18  flex flex-col justify-center items-center "}>
            <h1 className="p-2 w-6/12 text-slate-300"> Don't have account? </h1>
             <SubmitButton  className="w-6/12 mt-0 bg-cyan-700"onClick={()=>{setClose(!close)}}  title={"Register"}/>
            </div>
            </div>
                

            {/* registration container */}
            <div className={`${close?visibleContainer : hiddenContainer  }   overflow-scroll  h-registration`}>
            <div className={"  w-full xl:top-2/4 mt-18 mb-4 top-2/4 flex flex-col justify-center items-center"}>
            <h1 className="p-2 w-6/12 text-slate-300">Alrady have account?</h1>
             <SubmitButton  className="w-6/12 mt-0 "onClick={()=>{setClose(false)}}  title={"Sign-In"}/>
            </div>
                <RegistrationComponent/>
            </div>
        </div>


   
    </div>
    
    </>)
}