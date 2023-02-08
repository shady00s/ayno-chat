import React from "react";
import StorageManager from '../../utils/storage_manager';
import { useNavigate } from "react-router-dom";
import loadingScreenAnimation from "./loading_screen_animation";
 
const LoadingScreen = ()=>{
  const navigate = useNavigate()
   
    
      loadingScreenAnimation()
      const data = StorageManager.getUserData()
      setTimeout(()=>{
       
        if (Object.keys(data).length === 0  ){
          navigate("/ayno-chat/register")
        } 
        else{
          navigate("/ayno-chat/home")
        }
       

      

    },[])

  
  return(
    <>
    <div className="flex justify-center bg-background w-screen h-screen items-center">
    
        
        <div className=" w-32 h-32 "> 
       
        </div>

    </div>

    {/* {data === {} ? <Navigate to={"/ayno-chat/register"}/> : <Navigate to={"/ayno-chat/home"}/>} */}
 </>
  ) 
}


export default LoadingScreen