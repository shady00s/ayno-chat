import { Outlet,Navigate,Route } from "react-router-dom"
import StorageManager from "./utils/storage_manager"
const PrivateRoute = ()=>{

    let user_data = Object.keys(StorageManager.getUserData()).length !== 0  
   
    return(
       user_data ==true? <Outlet/> : <Navigate to={"/ayno-chat/register"}/>
    )
}

export default PrivateRoute