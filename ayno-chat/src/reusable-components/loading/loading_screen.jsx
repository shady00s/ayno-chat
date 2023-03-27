import { useEffect, useContext, useState,} from "react";
import {ReactComponent as Loading } from './loading.svg'
import loadingScreenAnimation from "./loading_screen_animation";
import ApiCall from './../../api_call';
import { Navigate } from 'react-router-dom';
import SocketContext from "../../context/socketContext";
import { useDispatch ,useSelector} from "react-redux";
import { setUser } from "../../redux/slice";
const LoadingScreen = () => {
  const [authenticated,setAuthenticated]= useState()
  const socket = useContext(SocketContext)

  const userDispatch = useDispatch()
  const user = useSelector((state)=>state.data.user)

  useEffect(() => { 
   
    if(user.id !== null) return setAuthenticated(true)
    else{
      ApiCall.getAuthentication().then(val => {
        if (val.data.message === "authenticated") {
          userDispatch(setUser({
            name: val.data.body.name,
            profileImagePath: val.data.body.profileImagePath,
            id:val.data.body.id
          }))
          socket.emit('global-id',val.data.body.id)
          setAuthenticated(true)
        }
        else {
          setAuthenticated(false)
        }
      })
    }
      

    
  }, [socket])
  useEffect(()=>{
    loadingScreenAnimation()

  },[])


  if(authenticated === undefined){
    return (
      <>
        <div className="flex justify-center bg-background w-screen h-screen items-center">
          <div className="w-12 h-12">
            <Loading/>

          </div>
        </div>
  
  
      </>
    ) 
  }
  else{
    return(
      
  
          authenticated? <Navigate to={'/ayno-chat/home'}/>:<Navigate to={'/ayno-chat/register'}/>

 
    )
  }



}


export default LoadingScreen