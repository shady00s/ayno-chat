import React, { useState, useEffect } from "react"

import * as cartoonAvatar from 'cartoon-avatar'

import SubmitButton from "./submit_button"
import InputErrorComponent from "./input_error_component"
const RegistrationComponent = () => {

    const [name, setName] = useState('')
    const [pass, setPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const [selectAvatar,setSelectAvatar] = useState({name:'',index:0})
    const [avatar, setAvatar] = useState([])

    useEffect(()=>{
        avatarGenerator()
    },[selectAvatar])

    function avatarGenerator() {
        if(avatar.length === 0){
            for (let x = 0; x < 40; x++) {
                setAvatar((avatarItem) => [...avatarItem, cartoonAvatar.generate_avatar({ "gender": "male", "id": x+1 })])
    
            }
        }
        return avatar
        
    }
    return (

        <>
            <div className="p-3 flex flex-col justify-center items-start w-11/12">
                <h2 className="text-slate-200 text-2xl mb-2">Register</h2>
                <span className="text-slate-400 " >Just add any random name and password to get started!</span>

                <form className="p-3 flex flex-col justify-evenly items-start">
                    <input onChange={(value) => { setName(value.target.value) }} className="m-1 p-2 bg-transparent border-b-2 border-b-cyan-700" type={"text"} placeholder={"name"}></input>
                    <input onChange={(value) => { setPass(value.target.value) }} className="m-1 p-2 bg-transparent border-b-2 border-b-cyan-700" type={"text"} placeholder={"Password"}></input>
                    {/* <InputErrorComponent title={"The password is soo weak!"} /> */}

                    <input onChange={(value) => { setConfirmPass(value.target.value) }} className="m-1 p-2 bg-transparent border-b-2 border-b-cyan-700" type={"text"} placeholder={"confirm password"}></input>
                    {/* <InputErrorComponent title={"The two passwords are not the same!"} /> */}


                    <h2 className="text-slate-200 text-2xl mb-2 mt-5">Select your avatar</h2>
                    <span className="text-slate-400 " >select how you like to appear to another contacts</span>
                    {/* Avatar Container */}
                    <div className=" h-36 overflow-y-auto w-5/6 m-auto mt-4 flex flex-wrap">

                       

                        {avatar.length ===0?<div className="m-auto flex flex-col justify-center items-center">
                        <svg aria-hidden="true" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="text-slate-400"> Loading Avatars...</span>

                        </div>  :avatar.map((img, index) => 
                                <img onClick={(target)=>{
                                    setSelectAvatar( {name:target.target.getAttribute('src') ,index:index})
                                }} key={img+index} className={`w-12 p-1 ${selectAvatar.index === index ? "rounded-md border-2 border-teal-400 transition-all" : "border-transparent transition-all"}`} src={img}/>
                           

                        )}

                    </div>
                    {/* remember me container */}

                    <div className="flex justify-evenly m-3 cursor-pointer" onClick={() => { setRememberMe(!rememberMe) }}>
                        <input checked={rememberMe} onChange={(value) => { setRememberMe(!rememberMe) }} type={"checkbox"} name={'rememberMe'} />
                        <label className="pl-2 text-slate-200" form="rememberMe">Remember me?</label>
                    </div>

                </form>
                <SubmitButton className="w-6/12" onClick={() => { console.log("test2") }} title={"Register"} />

            </div>
        </>
    )
}


export default RegistrationComponent