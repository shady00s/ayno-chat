import { useCallback, useState, useContext,useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";

import ApiCall from "./api_call";
import LoadingComponent from './reusable-components/loading/loading_component';
import UserContext from './context/userContext';

const PrivateRoute = () => {

    const [user_data, setUserData] = useState()
    const {user,setUser} = useContext(UserContext)

    useEffect(() => {
        if(Object.keys(user).length !== 0) return setUserData(true)
        ApiCall.getAuthentication().then(data => {
            if (data.data.message === "authenticated") {
                setUser({
                    name: data.data.body.name,
                    profileImagePath: data.data.body.profileImagePath,
                    id:data.data.body.id
                  })
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
                <LoadingComponent />
            </div>
        </>
    }

}

export default PrivateRoute