import { useEffect, useState } from "react";
import { Outlet, Navigate, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import StorageManager from "./utils/storage_manager";
import ApiCall from "./api_call";
import LoadingComponent from './reusable-components/loading/loading_component';

const PrivateRoute = () => {

    const [user_data, setUserData] = useState()

    useEffect(() => {


        ApiCall.getAuthentication().then(data => {
            if (data.data.message === "authenticated") {
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