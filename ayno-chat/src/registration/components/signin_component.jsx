import SubmitButton from "./submit_button"
import React, { useState, useContext } from "react"
import InputTextComponent from './input_text_component';
import ApiCall from '../../api_call';
import RegisterScreenContext from '../../context/registrationContext';
import { useNavigate } from 'react-router-dom';
import InputErrorComponent from './input_error_component';
import { Eye,EyeOff } from "react-feather";
const SignInComponent = () => {
    const navigate = useNavigate()
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setloading] = useState(false)
    const [showPassword,setShowPassword]=useState(false)
    const { setScreen } = useContext(RegisterScreenContext)

    const [errorMessage, setErrorMessage] = useState("")
    const sendLoginData = async () => {
        setloading(true)

         await ApiCall.getUserLoginData({ user_name: userName, user_password: password }).then(loginData => {
            console.log(loginData.data.message)
            if (loginData.status === 200) {

                navigate('/ayno-chat/home')
                setloading(false)
            }
            
        }).catch((error)=>{
             if(error.response.status === 400){
                setErrorMessage(error.response.data.message)
                setloading(false)
            }
        })
    }
    return (
        <>
            <div className="p-3 w-11/12  flex-col flex ">
                <h2 className="text-slate-200 text-2xl mb-2">Sign-in</h2>
                <span className="text-slate-400" >Just add any random name and password to get started!</span>

                <form className="p-3 flex flex-col justify-start items-start">

                    <InputTextComponent onChange={(event) => { setUserName(event.target.value) }} placeHolder={"Name:"} />
                    <div className="flex justify-center w-full items-center">
                        <InputTextComponent type={showPassword?"text":"password"} onChange={(event) => { setPassword(event.target.value) }} placeHolder={"Password:"} />
                        <div className="cursor-pointer" onClick={()=>{setShowPassword(()=>!showPassword)}}>
                            {showPassword?<Eye className="stroke-slate-400 "/>:<EyeOff className="stroke-slate-600"/>}
                        </div>
                    </div>



                </form>

                {/* register link */}

                <span className="text-slate-400 p-4">Don't have profile?  <span onClick={() => { setScreen("register") }} className="text-orange-300 cursor-pointer ">Register</span></span>
                <InputErrorComponent show={errorMessage !== "" ? true : false} title={errorMessage} />
                <SubmitButton future={loading} className="w-6/12 bg-indigo-800" onClick={() => {
                    sendLoginData()

                }} title={"Sign-in"} />



            </div>
        </>
    )
}

export default SignInComponent;