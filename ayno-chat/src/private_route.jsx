import { useCallback, useState, useContext,useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import SocketContext from "./context/socketContext";
import ApiCall from "./api_call";
import LoadingComponent from './reusable-components/loading/loading_component';
import {ReactComponent as Loading } from './reusable-components/loading/loading.svg'
import loadingScreenAnimation from "./reusable-components/loading/loading_screen_animation";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/slice";
const PrivateRoute = () => {

    const [user_data, setUserData] = useState()
    // const {user,setUser} = useContext(UserContext)
    const socket = useContext(SocketContext)
    const userDispatch = useDispatch()
    const userData = useSelector((state)=>state.data.user)
    useEffect(() => {
        loadingScreenAnimation()
        if(userData.id !== null) return setUserData(true)
        ApiCall.getAuthentication().then(data => {
            if (data.data.message === "authenticated") {
                userDispatch(setUser({
                    name: data.data.body.name,
                    profileImagePath: data.data.body.profileImagePath,
                    id:data.data.body.id
                  }))
                  socket.emit('global-id',data.data.body.id)

                setUserData(() => true)

            } else {
                setUserData(() => false)
            }
        })


    }, [])

    if (user_data != undefined) {
        return (

            user_data ? <Outlet /> : <Navigate to={"/ayno-chat/register"} />
        )

    } else {
        return <>
            <div className="flex justify-center items-center w-screen h-screen">
            <div className="w-12 h-12">
            <Loading/>

          </div>
            </div>
        </>
    }

}

export default PrivateRoute