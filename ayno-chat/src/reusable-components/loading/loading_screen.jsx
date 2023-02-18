import React, { useEffect, useContext } from "react";

import loadingScreenAnimation from "./loading_screen_animation";
import ApiCall from './../../api_call';
import { useNavigate } from 'react-router-dom';
import UserContext from './../../context/userContext';

const LoadingScreen = () => {
  const{setUser} = useContext(UserContext)
  const nav = useNavigate()
  useEffect(() => { }, [
    ApiCall.getAuthentication().then(val => {
      if (val.data.message === "authenticated") {
        setUser({
          name: val.data.body.name,
          profileImagePath: val.data.body.profileImagePath
        })
        nav('/ayno-chat/home')

      }
      else {
        nav('/ayno-chat/register')
      }
    })
  ])

  loadingScreenAnimation()




  return (
    <>
      <div className="flex justify-center bg-background w-screen h-screen items-center">




      </div>


    </>
  )
}


export default LoadingScreen