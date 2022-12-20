import React, { useState, useEffect } from "react"

import * as cartoonAvatar from 'cartoon-avatar'

import SubmitButton from "./submit_button"
import InputErrorComponent from "./input_error_component"
import InputTextComponent from './input_text_component';
import LoadingComponent from './../../reusable-components/loading_component';
import ApiCall from './../../home/api_call';
import RegisterValidation from './RegisterValidation';
const RegistrationComponent = () => {

    //registration data object
    const[registerData,setRegisterData]=useState({
        username:'',
        password:'',
        profilePath:''
    })
    // registration data
    const [username, setUsername] = useState('')
    const [pass, setPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [rememberMe, setRememberMe] = useState(false)

    // avatar data
    const [avatar, setAvatar] = useState([])
    const [selectAvatar,setSelectAvatar] = useState({name:avatar[0],index:0})
    const [gender,setGender] = useState("male")
 
    const usernameWhiteSpaceRegExp = /\s/

    useEffect(()=>{
        
        // get avatars from cartoon avatar api
        function avatarGenerator(gneder) {
            // to not render more images every refresh
            if(avatar.length <=40 ){
                setAvatar([])
                for (let x = 0; x < 40; x++) {
                    setAvatar((avatarItem) => [...avatarItem, cartoonAvatar.generate_avatar({ "gender": gneder, "id": x+1 })])
        
                }
            }
    
            return avatar
            
        }
        avatarGenerator(gender)


        setRegisterData({
            username:username,
            password:pass,
            profilePath:selectAvatar.name
        })


    },[gender,username,pass,selectAvatar])


  
        // send register data to the api
    const [loading,setLoading]=useState(false)
    const postRegisterData = ()=>{


        if( RegisterValidation.nameValidation(username) ===true && RegisterValidation.passwordValidation(pass,confirmPass)===true && selectAvatar.name!=='' ){
            setLoading(true)
           


            ApiCall.postUserRegisterData(registerData).then(apiResponse=>{
                if(apiResponse.status===201){
                    setLoading(false)
                    
                }else{
                    setLoading(false)
                     alert('there is an problem '+apiResponse.data)   
                }
            })
        }

        else{
            setLoading(false)
        }

    }
        
  
    return (

        <>
            <div className="p-3 flex flex-col justify-center items-start w-11/12">
                <h2 className="text-slate-200 text-2xl mb-2">Register</h2>
                <span className="text-slate-400 " >Just add any random name and password to get started!</span>

                <form className="p-3 flex flex-col justify-evenly items-start">
                    <InputTextComponent onChange={(value) => { setUsername(value.target.value) }} placeHolder={"Name"}/>
                    {/* check if the username is not less than 4 characters*/}
                    {username.length <=4 && username !==''? <InputErrorComponent title={"username is too short it must be at least 4 characters"} />:null  }
                    
                    {/* check if the username have whitespace*/}
                    {usernameWhiteSpaceRegExp.test(username)? <InputErrorComponent title={"username cannot contain whitespace"} />:null  }

                     <InputTextComponent onChange={(value) => { setPass(value.target.value) }} placeHolder={"Password"}/>

                    {/* check if the  password is more than 8 characters */}
                    {pass.length <=8 && pass.length !==0?
                    <InputErrorComponent title={"The password is soo weak ! it must be 8 characters at least."} />:null}

                    
                    <InputTextComponent onChange={(value) => { setConfirmPass(value.target.value) }} placeHolder={"Confirm password"}/>

                     {/* check if the confirm password is like password */}
                    {confirmPass !== pass? <InputErrorComponent title={"The two passwords are not the same!"} />:null  }
                   

                    {/* remember me container */}

                    <div className="flex justify-evenly m-3 " onClick={() => { setRememberMe(!rememberMe) }}>
                        <input className="cursor-pointer" checked={rememberMe} onChange={() => { setRememberMe(!rememberMe) }} type={"checkbox"} name={'rememberMe'} />
                        <label className="pl-2 text-slate-200 select-none cursor-pointer" form="rememberMe">Remember me?</label>
                    </div>

                </form>
                                        {/* choose avatar gender */}
                                        <div className="flex justify-between items-center">
                        <h2 className="text-slate-200 text-2xl mb-2 mt-5">Select your avatar</h2>

                           <div className="h-full flex justify-between items-center m-2 mt-5" >
                            <button onClick={()=>{
                                console.log('x')
                                setGender("male")}} className={`${gender==="male"? "bg-blue-800 ":"bg-zinc-600 "} transition-colors w-16 h-10 m-1 rounded-md text-slate-200` }>Male</button>
                            <button onClick={()=>{
                                console.log('y')
                                setGender("female")}} className={`${gender==="female"? "bg-pink-700 ":"bg-zinc-600 "} transition-colors w-16 h-10 bg-zinc-600 m-1 rounded-md text-slate-200 `}>Female</button>
                            </div> 
                        </div>

                    <span className="text-slate-400 " >select how you like to appear to another contacts</span>
                    {/* Avatar Container */}
                    <div className=" h-36 overflow-y-auto w-5/6 m-auto mt-4 mb-4 flex flex-wrap">

                       

                        {avatar.length ===0?<LoadingComponent title={"Loading Avatars...."}/>  :avatar.map((img, index) => 
                                <img alt="avatars" onClick={(target)=>{
                                    setSelectAvatar( {name:target.target.getAttribute('src') ,index:index})
                                }} key={img+index} className={`w-12 p-1 ${selectAvatar.index === index ? "rounded-md border-2 border-teal-400 transition-all" : "border-transparent transition-all"}`} src={img}/>
                           

                        )}

                    </div>
               {loading? <LoadingComponent/>: <SubmitButton className="w-6/12 bg-indigo-800" onClick={() => { postRegisterData() }} title={"Register"} />}

            </div>
        </>
    )
}


export default RegistrationComponent