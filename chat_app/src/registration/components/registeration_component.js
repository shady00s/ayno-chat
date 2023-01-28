import React, { useState, useEffect } from "react"
import SubmitButton from "./submit_button"
import InputErrorComponent from "./input_error_component"
import InputTextComponent from './input_text_component';
import LoadingComponent from './../../reusable-components/loading/loading_component';
import ApiCall from '../../api_call';
import RegisterValidation from './RegisterValidation';
import { useNavigate } from "react-router-dom";
import StorageManager from "../../utils/storage_manager";
import SelectAvatarComponent from "../../reusable-components/select_avatar_component";
const RegistrationComponent = () => {
    //router 
    const navigate = useNavigate();
    
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
    const [avatar, setAvatar] = useState('')
 
    const usernameWhiteSpaceRegExp = /\s/

    useEffect(()=>{
        
        // get avatars from cartoon avatar api
        console.log(avatar)
        setRegisterData({
            username:username,
            password:pass,
            profilePath:avatar

        })
    

    },[username,pass,avatar])


  
        // send register data to the api
    const [loading,setLoading]=useState(false)
    const postRegisterData = ()=>{
        
        if( RegisterValidation.nameValidation(username) ===true && RegisterValidation.passwordValidation(pass,confirmPass)===true && avatar.name!=='' ){
            setLoading(true)
           


            ApiCall.postUserRegisterData(registerData).then(apiResponse=>{
                if(apiResponse.status===201){
                    setLoading(false)

                    if(rememberMe===true){
                        StorageManager.insertDataToStorage({
                            name:apiResponse.data.user_body.name,
                            profilePath:apiResponse.data.user_body.profileImagePath,
                            id:apiResponse.data.user_body._id
                        },'local')
                    }else{
                        StorageManager.insertDataToStorage({
                            name:apiResponse.data.user_body.name,
                            profilePath:apiResponse.data.user_body.profileImagePath,
                            id:apiResponse.data.user_body._id
                        },'session')

                    }
            


                    navigate('/home')
                }else{
                    setLoading(false)
                    console.log(apiResponse.data)
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
            <div className="p-3 flex flex-col justify-center items-start w-11/12 ">
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
                                      

                    {/* Avatar Container */}
                
                    <SelectAvatarComponent onClick={target=> {setAvatar( target.target.getAttribute('src'))}}/>

                   

               {loading? <LoadingComponent/>: <SubmitButton className="w-6/12 bg-indigo-800 mt-2 mb-6 " onClick={() => { postRegisterData() }} title={"Register"} />}

            </div>
        </>
    )
}


export default RegistrationComponent