import SubmitButton from "./submit_button"
import React,{useState,useContext} from "react"
import InputTextComponent from './input_text_component';
import ApiCall from '../../api_call';
import StorageManager from "../../utils/storage_manager";
import { useNavigate } from 'react-router-dom';
import RegisterScreenContext from '../../context/registrationContext';

const SignInComponent = ()=>{
    const [rememberMe,setRememberMe]=useState(false)
    const [userName,setUserName]=useState('')
    const [password,setPassword]=useState('')
    const navigate = useNavigate()
    const {setScreen} = useContext(RegisterScreenContext)
    const  sendLoginData = async ()=>{
       await ApiCall.getUserLoginData({user_name:userName,user_password:password}).then(loginData=>{
            if(loginData.status===200){
                
               
                navigate("/ayno-chat/home")
            }
        })
    }
    return(
        <>
            <div className="p-3 w-11/12  flex-col flex ">
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

                {/* register link */}

                <span className="text-slate-400 p-4">Don't have profile?  <span onClick={()=>{setScreen("register")}} className="text-orange-300 cursor-pointer ">Register</span></span>
                <SubmitButton future className="w-6/12 bg-indigo-800" onClick={()=>{sendLoginData()}} title={"Sign-in"}/>

            
       
       </div>
        </>
    )
}

export default SignInComponent;