import SubmitButton from "./submit_button"
import React,{useState,useContext} from "react"
import InputTextComponent from './input_text_component';
import ApiCall from '../../api_call';
import StorageManager from "../../utils/storage_manager";
import RegisterScreenContext from '../../context/registrationContext';
import { useNavigate } from 'react-router-dom';

const SignInComponent = ()=>{
    const navigate = useNavigate()
    const [rememberMe,setRememberMe]=useState(false)
    const [userName,setUserName]=useState('')
    const [password,setPassword]=useState('')
    const [loading,setloading]=useState(false)
    const {setScreen} = useContext(RegisterScreenContext)
    const  sendLoginData = async ()=>{
       await ApiCall.getUserLoginData({user_name:userName,user_password:password}).then(loginData=>{
               
            if(loginData.status===200){
                  //  console.log(loginData.data.data)
               //StorageManager.setCookies(JSON.stringify(loginData.data.data))
                navigate('/ayno-chat/home')
            }
            else{
                alert("there is error")
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
                    
                 
                    
                </form>

                {/* register link */}

                <span className="text-slate-400 p-4">Don't have profile?  <span onClick={()=>{setScreen("register")}} className="text-orange-300 cursor-pointer ">Register</span></span>
                <SubmitButton future={loading} className="w-6/12 bg-indigo-800" onClick={()=>{
                    setloading(true)
                    sendLoginData().then(val=>setloading(false))}} title={"Sign-in"}/>

            
       
       </div>
        </>
    )
}

export default SignInComponent;