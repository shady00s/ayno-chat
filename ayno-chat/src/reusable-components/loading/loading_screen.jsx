import { useEffect, useContext, useState,} from "react";
import {ReactComponent as Loading } from './loading.svg'
import loadingScreenAnimation from "./loading_screen_animation";


import { useNavigate } from 'react-router-dom';
const LoadingScreen = () => {
  const nav = useNavigate()

  useEffect(() => { 
   


   
    loadingScreenAnimation()
      
      nav('/ayno-chat/home')
    
  }, [])



 
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


export default LoadingScreen