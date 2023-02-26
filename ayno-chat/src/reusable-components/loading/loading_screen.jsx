import React, { useEffect, useContext, useState } from "react";

//import loadingScreenAnimation from "./loading_screen_animation";
import ApiCall from './../../api_call';
import { Navigate, useNavigate } from 'react-router-dom';
import UserContext from './../../context/userContext';
import LoadingComponent from "./loading_component";
const LoadingScreen = () => {
  const{user,setUser} = useContext(UserContext)
  const [authenticated,setAuthenticated]= useState()
  const nav = useNavigate()

  useEffect(() => { 
    if(Object.keys(user).length !== 0)  nav('/ayno-chat/home')

    ApiCall.getAuthentication().then(val => {
      if (val.data.message === "authenticated") {
        setUser({
          name: val.data.body.name,
          profileImagePath: val.data.body.profileImagePath,
          id:val.data.body.id
        })
        setAuthenticated(true)
      }
      else {
        setAuthenticated(false)
      }
    })
  }, [])

  //loadingScreenAnimation()

  if(authenticated === undefined){
    return (
      <>
        <div className="flex justify-center bg-background w-screen h-screen items-center">
  
        <LoadingComponent />
  
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