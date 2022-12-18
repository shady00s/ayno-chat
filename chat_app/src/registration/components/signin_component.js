import SubmitButton from "./submit_button"
import React,{useState} from "react"

const SignInComponent = ()=>{
    const [rememberMe,setRememberMe]=useState(false)
    return(
        <>
            <div className="p-3 w-11/12 flex-col flex justify-center">
                <h2 className="text-slate-200 text-2xl mb-2">Sign-in</h2>
                <span className="text-slate-400" >Just add any random name and password to get started!</span>

                <form className="p-3 flex flex-col justify-start items-start">

                    <input className=" focus:boder-b-6 m-1 p-2 bg-transparent border-b-2 border-b-cyan-700" placeholder="Your name"/>
                    <input className="m-1 p-2 bg-transparent border-b-2 border-b-cyan-700" placeholder="Your password"/>
                    {/* remember me container */}
                     <div className="flex justify-evenly m-3 cursor-pointer" onClick={()=>{setRememberMe(!rememberMe)}}>
                    <input checked={rememberMe} onChange={(value)=>{setRememberMe(!rememberMe)}} type={"checkbox"} name={'rememberMe'}/>
                    <label  className="pl-2 text-slate-200" form="rememberMe">Remember me?</label>
                    </div>
                    
                </form>
                <SubmitButton className="w-6/12" onClick={()=>{console.log("test1")}} title={"Sign-in"}/>

            
       
       </div>
        </>
    )
}

export default SignInComponent;