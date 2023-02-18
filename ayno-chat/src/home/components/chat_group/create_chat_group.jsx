import {Users} from "react-feather"
import NavigationContext from './../../../context/navigationContext';
import { useContext } from "react";
export default function CreateChatGroup(){
    const {setNavigation} = useContext(NavigationContext)
    return(
        <>
            <div onClick={()=>{setNavigation('create-Group')}} className=" bg-cyan-600 rounded-2xl pl-3 pr-3 p-1 cursor-pointer">
                <div className="flex items-center">
                    <Users className="mr-2 " size={14}/>
                    <h1 className="text-slate-300 text-sm">Create Group</h1>
                </div>

            </div>
            
        </>


    )
}