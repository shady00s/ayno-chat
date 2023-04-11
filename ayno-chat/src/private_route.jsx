import React,{ useState, useContext,useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import SocketContext from "./context/socketContext";
import ApiCall from "./api_call";
import {ReactComponent as Loading } from './reusable-components/loading/loading.svg'
import loadingScreenAnimation from "./reusable-components/loading/loading_screen_animation";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/slice";
const PrivateRoute = () => {

    const [user_data, setUserData] = useState()
    const socket = useContext(SocketContext)
    const userDispatch = useDispatch()
    useEffect(() => {
        loadingScreenAnimation()
       
   
            ApiCall.getAuthentication().then(data => {
                if (data.data.message === "authenticated") {
                    if(socket !== null){

                        socket.emit('global-id',data.data.body.id)
                    }
                    userDispatch(setUser({
                        name: data.data.body.name,
                        profileImagePath: data.data.body.profileImagePath,
                        id:data.data.body.id
                      }))
    
                    setUserData(() => true)
    
                } else {
                    setUserData(() => false)
                }
            })

        


    }, [])


        return (
            user_data=== undefined ? <>
            <div className="flex justify-center items-center w-screen h-screen">
            <div className="w-12 h-12">
            <Loading/>

          </div>
            </div>
        </>: user_data ?<Outlet /> : <Navigate to={"/ayno-chat/register"} />
        )
    

}

export default React.memo(PrivateRoute)