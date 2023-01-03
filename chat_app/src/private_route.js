import { Outlet,Navigate } from "react-router-dom"
import StorageManager from "./utils/storage_manager"
const PrivateRoute = ()=>{
    //checks if the user data is existed in the local / session storage to navigate to home page if not navigate to register page

    let user_data = StorageManager.getDataFromStorage !== {} ? true:false
    return(
       user_data? <Outlet/> : <Navigate to={"/ayno-chat/register"}/>
    )
}

export default PrivateRoute