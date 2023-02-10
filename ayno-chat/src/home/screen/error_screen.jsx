import SubmitButton from "../../registration/components/submit_button";
import StorageManager from "../../utils/storage_manager";
import { useNavigate } from 'react-router-dom';

export function ErrorPage(){
    const nav = useNavigate()

    return <>
    
        <div className="flex justify-center items-center w-full h-screen flex-col">
            <h2 className="text-slate-200 text-3xl">Oops , there is an error with URL</h2>
            <h2 className="text-slate-400 text-2xl">404 - Page not found</h2>
            <div className="p-2">
            <SubmitButton onClick={()=>{
                const userData = StorageManager.getUserData()
                if(Object.keys(userData).length === 0){
                        nav('/ayno-chat/register')
                }else{
                    nav('/ayno-chat/home')
                }
              
            }} className="bg-cyan-600" title="Back to home screen"/>
            </div>
         
        </div>
    </>
}