import TextInputContainer from "../../home/components/text_input_component"
import SubmitButton from "./submit_button"
import React,{useState,useEffect} from "react"
import InputTextComponent from './input_text_component';
import ApiCall from './../../home/api_call';

const SignInComponent = ()=>{
    const [rememberMe,setRememberMe]=useState(false)
    const [userName,setUserName]=useState('')
    const [password,setPassword]=useState('')
   
    const sendLoginData = ()=>{
        ApiCall.getUserLoginData().then(loginData=>{
            if(loginData.status===200){
                
            }
        })
    }
    return(
        <>
            <div className="p-3 w-11/12 flex-col flex justify-center">
                <h2 className="text-slate-200 text-2xl mb-2">Sign-in</h2>
                <span className="text-slate-400" >Just add any random name and password to get started!</span>

                <form className="p-3 flex flex-col justify-start items-start">

                    <InputTextComponent onChange={(event)=>{setUserName(event.target.value)} }placeHolder={"Name:"}/>
                    <InputTextComponent onChange={(event)=>{setPassword(event.target.value)} }placeHolder={"Password:"}/>
                    
                    {/* remember me container */}
                     <div className="flex justify-evenly m-3 cursor-pointer" onClick={()=>{setRememberMe(!rememberMe)}}>
                    <input checked={rememberMe} onChange={(value)=>{setRememberMe(!rememberMe)}} type={"checkbox"} name={'rememberMe'}/>
                    <label  className="pl-2 text-slate-200 select-none" form="rememberMe">Remember me?</label>
                    </div>
                    
                </form>
                <SubmitButton className="w-6/12 bg-indigo-800" onClick={()=>{console.log("test1")}} title={"Sign-in"}/>

            
       
       </div>
        </>
    )
}

export default SignInComponent;