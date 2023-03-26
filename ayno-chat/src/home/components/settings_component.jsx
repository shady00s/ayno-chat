import SelectAvatarComponent from "../../reusable-components/select_avatar_component"
import InputTextComponent from "../../registration/components/input_text_component"
import { useContext,useState,useRef } from "react"
import NavigationContext from "../../context/navigationContext"
import {useSelector} from 'react-redux'
import SubmitButton from './../../registration/components/submit_button';
import ApiCall from './../../api_call';
import { useNavigate } from 'react-router-dom';

const SettingsComponent = () => {
    const {navigation} = useContext(NavigationContext)
    const user = useSelector((state)=>state.data.user)
    const [avatar,setAvatar]= useState(user.profileImagePath)
    const [loading,setLoading]=useState(false)
    const userName = useRef("")
    const newPassword = useRef("")
    const newProfileImagePath= useRef("")
    const nav = useNavigate()
    return (
        <>
            <div className={`${navigation==="Settings"?"translate-x-0" :"translate-x-[-9999px]"} duration-500 transition-transform absolute  bg-background w-[93vw] overflow-x-hidden h-[90vh] left-11 z-40`}>
                <h1 className="text-slate-200 text-xl p-5 mb-5 border-b-2 pb-4 border-b-slate-800">Settings</h1>

                <div className="flex  w-full justify-evenly flex-wrap overflow-y-auto">
                     {/* personal info */}
                <div className="   w-full flex flex-wrap h-5/6 overflow-y-auto">
                   
                    <div className=" flex flex-wrap flex-col md:w-5/12 w-full  justify-start items-start ml-8 mb-5">
                        
                        <h2 className=" mb-12 text-2xl text-slate-200 ">Personal Info</h2>
                        <span className="ml-6 text-slate-600">you can change your name and password</span>
                        <div className="ml-2  flex flex-col justify-start items-start">

                            <InputTextComponent onChange={(value)=>{userName.current = value.target.value}} placeHolder={"Your name :  " +user.name}/>

                            <InputTextComponent onChange={(value)=>{newPassword.current = value.target.value}} placeHolder={"change password"}/>
                        
                        </div>
                        

                    </div>

                    <div className="w-10/12 md:w-6/12 min-w-min p-1">
                        <div className="flex justify-between items-center">
                        <h2 className="text-slate-200 text-2xl ">Change Avatar</h2>
                        <img src={avatar} className="w-12 h-12 rounded-full"/>
                        </div>

                        <div className="ml-8 mt-2">
                            <SelectAvatarComponent changeGender ={true} onClick={(avatarVal)=>{
                                newProfileImagePath.current = avatarVal.target.src
                                setAvatar(avatarVal.target.src)}}/>
                            </div>
                        </div>

                    
               
                </div>
                      
                <SubmitButton future={loading} onClick={async()=>{
                        setLoading(true)
                      await  ApiCall.editProfileData({newUserName:userName.current,newUserPassword:newPassword.current,newProfileImagePath:newProfileImagePath.current}).then(val =>{
                       if(val.status === 201){
                        nav('/')
                       }
                       
                        setLoading(false)
                      })
                    
                  //  ApiCall.editProfileData({newUserName:userName.current,newUserPassword:newPassword})
                }} title={"save changes"} className={'bg-green-600 m-auto mt-4 translate-x-[-40%]'}/>
                </div>
            </div>

        </>
    )
}

export default SettingsComponent