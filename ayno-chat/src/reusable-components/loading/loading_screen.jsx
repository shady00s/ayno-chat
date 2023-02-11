import React ,{useEffect}from "react";

import loadingScreenAnimation from "./loading_screen_animation";
import ApiCall from './../../api_call';
import { useNavigate } from 'react-router-dom';
const LoadingScreen = ()=>{
  const nav = useNavigate()
      useEffect(()=>{},[
        ApiCall.getAuthentication().then(val=>{
          if(val.data.message=== "authenticated"){
              nav('/ayno-chat/home')
          }
          else{
            nav('/ayno-chat/register')
          }
        })
      ])
    
      loadingScreenAnimation()
   


  
  return(
    <>
    <div className="flex justify-center bg-background w-screen h-screen items-center">
    
        
       

    </div>

   
 </>
  ) 
}


export default LoadingScreen