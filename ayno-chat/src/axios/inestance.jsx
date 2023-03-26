import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import LoadingContext from "../context/loadingContext";


const axiosInestance = axios.create({
    baseURL:"http://192.168.1.4:8080/",
    withCredentials:true
})
//"https://ayno-chat-api.onrender.com
//https://ayno-chat-api.onrender.com

// const axiosUserInestance = axios.create({
//     baseURL:"http://192.168.1.4:8080/user",
//     withCredentials:true
// })

const userInstance = axios.create({
    baseURL:"http://192.168.1.4:8080/user",
    withCredentials:true
})




function UserAxiosInstanceComponent(props){
    const [loading,setLoading] = useState(false)

    const loadingVal = useMemo(()=>({loading,setLoading}),[loading])
    useEffect(()=>{
        userInstance.interceptors.request.use( (config)=>{

                setLoading(true)
                return config
            })
        
        ,err=>{
            
              console.log(err);
            
        }
        
        userInstance.interceptors.response.use((config=>{
            setLoading(false)

            return config
        }),err=>{
            
                console.log(err);
           
        })
    },[])

    return(<>
    <LoadingContext.Provider value={loadingVal}>
        {props.children}

    </LoadingContext.Provider>
    </>)
}

export  {axiosInestance,userInstance,UserAxiosInstanceComponent}