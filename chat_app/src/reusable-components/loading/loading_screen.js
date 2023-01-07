import React from "react";
import StorageManager from '../../utils/storage_manager';
 import { useEffect,useState } from "react";
import { Navigate,useNavigate } from "react-router-dom";
import { ReactComponent as Svg } from "./loading.svg";
import loadingScreenAnimation from "./loading_screen_animation";
 

const LoadingScreen = ()=>{
  const navigate = useNavigate()
    const [data,setData] = useState(StorageManager.getDataFromStorage())
    useEffect(()=>{
      loadingScreenAnimation()

      setTimeout(()=>{
        if (Object.keys(data).length === 0  ) navigate("/ayno-chat/register")
        navigate("/ayno-chat/home")

      },4000)

    },[])

  
  return(
    <>
    <div className="flex justify-center bg-background w-screen h-screen items-center">
    
        
        <div className=" w-32 h-32 "> 
        <Svg/>
        </div>

    </div>

    {/* {data === {} ? <Navigate to={"/ayno-chat/register"}/> : <Navigate to={"/ayno-chat/home"}/>} */}
 </>
  ) 
}


export default LoadingScreen