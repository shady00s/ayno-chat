import React from "react";
import StorageManager from './../utils/storage_manager';
 import { useEffect,useState } from "react";
import { Navigate } from "react-router-dom";



 

const LoadingScreen = ()=>{
    const [data,setData] = useState(StorageManager.getDataFromStorage)
    

  
  return(
    <>
    <div className="flex justify-center bg-background w-screen h-screen items-center">
    
        
        <div className=" w-80 h-80 "> 
       
        </div>

    </div>

    {data === {} ? <Navigate to={"/ayno-chat/register"}/> : <Navigate to={"/ayno-chat/home"}/>}
 </>
  ) 
}


export default LoadingScreen