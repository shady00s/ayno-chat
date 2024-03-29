import React, {useRef, useState, useEffect,useContext } from "react"
import SubmitButton from "./submit_button"
import InputErrorComponent from "./input_error_component"
import InputTextComponent from './input_text_component';
import ApiCall from '../../api_call';
import RegisterValidation from './RegisterValidation';
import { useNavigate } from "react-router-dom";
import SelectAvatarComponent from "../../reusable-components/select_avatar_component";
import RegisterScreenContext from '../../context/registrationContext';
import { userNameLengthRegExp, usernameWhiteSpaceRegExp } from "../../constants";

const RegistrationComponent = () => {
    //router 
    const navigate = useNavigate();
    const {screen,setScreen} = useContext(RegisterScreenContext)

    //registration data object
    const[registerData,setRegisterData]=useState({
        username:'',
        password:'',
        profilePath:''
    })
    // registration data
    const oldName = useRef("")
    const [username, setUsername] = useState('')
    const [pass, setPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [isAlreadyExisted,setIsAlreadyExisted]= useState(false)

    // avatar data
    const [avatar, setAvatar] = useState('')
    const [choosenAvatar,setChoosenAvatar]=useState(false)
 
    
    useEffect(()=>{
       
        // get avatars from cartoon avatar api
       let userNameWithoutText = username.replace(/\s/g,'')
        setRegisterData({
            username:userNameWithoutText,
            password:pass,
            profilePath:avatar

        })
    

    },[username,pass,avatar])


  
        // send register data to the api
    const [loading,setLoading]=useState(false)

    const postRegisterData = ()=>{
            if(avatar===''){
                setChoosenAvatar(true)
            }
       else if( RegisterValidation.nameValidation(username) ===true && RegisterValidation.passwordValidation(pass,confirmPass)===true && avatar.name!=='' ){
            setLoading(true)
           


            ApiCall.postUserRegisterData(registerData).then(apiResponse=>{
                if(apiResponse.status===201){
                    setLoading(false)

                 navigate('/ayno-chat/home')
                }else if(apiResponse.status===200){
                    oldName.current = username
                    setIsAlreadyExisted(true)
                    setLoading(false)
                    
           }
            }).catch((err)=>{
                setLoading(false)
            })
        }

        else{
            setLoading(false)
        }

    }
        
  
    return (

        <>
            <div className=" flex flex-col  justify-start p-4">
                <h2 className="text-slate-200 text-2xl mb-2">Register</h2>
                <span className="text-slate-400" >Just add any random name and password to get started!</span>
                <div className="flex justify-between flex-wrap   m-auto  p-4 w-[95%] ">
                
                <div className=" md:w-6/12 w-full  ">
                <form className="p-3 flex flex-col items-start ">
                    <InputTextComponent onChange={(value) => {
                        if(oldName.current !== value.target.value){

                            setIsAlreadyExisted(false)
                        }else{
                            setIsAlreadyExisted(true)
                        }
                        let nameValue = value.target.value
                        let name = nameValue.replace(/\s/g, '')
                        setUsername(()=>name) }} placeHolder={"Name"}/>
                    {/* check if the username is not less than 4 characters*/}
                     <InputErrorComponent show={userNameLengthRegExp.test(username)?true:false} title={"username is too short it must be at least 4 characters"} />
                    
                    {/* check if the username have whitespace*/}
                     <InputErrorComponent show={usernameWhiteSpaceRegExp.test(username)?true:false} title={"username cannot contain whitespace"} />

                    {/* if username is already taken */}
                    <InputErrorComponent show={isAlreadyExisted} title={`username ${username} is already existed`} />

                     <InputTextComponent onChange={(value) => { setPass(value.target.value) }} placeHolder={"Password"}/>

                    {/* check if the  password is more than 8 characters */}
                    
                    <InputErrorComponent show={pass.length <=8 && pass.length !==0? true:false} title={"The password is soo weak ! it must be 8 characters at least."} />

                    
                    <InputTextComponent onChange={(value) => { setConfirmPass(value.target.value) }} placeHolder={"Confirm password"}/>

                     {/* check if the confirm password is like password */}
                  <InputErrorComponent show={  confirmPass !== pass? true:false }  title={"The two passwords are not the same!"} />
                   

                    

                </form>

                <span className="text-slate-400 p-4">Already have profile?  <span onClick={()=>{setScreen("sign-in")}} className="text-orange-300 cursor-pointer ">Sign-in</span></span>

                </div>
                
                      
                 {/* Avatar Container */}
                 <div className={`${screen ==='register'? "opacity-100":"opacity-0"} duration-300 ease-in  w-[20rem] transition-opacity `}>

                    <SelectAvatarComponent changeGender onClick={target=> {
                        setAvatar(target.target.getAttribute('src'))
                        setChoosenAvatar(false)
                        }}/>
                <div><InputErrorComponent show={choosenAvatar}  title={"Please select avatar image"} /></div>  
                    </div>  

               
               
                
                    <div className="w-full flex">  <SubmitButton className="md:w-4/12 w-7/12 bg-indigo-800 mt-2 mb-6 m-auto " future={loading} onClick={
                        
                        () => { postRegisterData() }} title={"Register"} /></div>

                
                </div>
 


            </div>
        </>
    )
}


export default RegistrationComponent