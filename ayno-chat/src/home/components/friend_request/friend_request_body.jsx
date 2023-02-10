import { logo } from "../../../constants";
import {UserPlus,Slash } from 'react-feather'
export default function FriendRequestBody(){
    return(
        <>
         <div className="bg-[rgba(123,167,243,0.06)] rounded-lg p-1 m-2 flex-col w-[96%] flex items-center justify-center">
                    <div className="flex items-center w-[95%] pr-1 pt-1 pl-1">
                    <img src={logo} className="w-12 h-8 rounded-full object-contain"/>
                        <h1 className=" text-ellipsis text-slate-200 pl-3">Tester</h1>
                    </div>
                    <span className="text-slate-400 text-sm mb-3 p-1">Send you a friend request</span>

                    {/* button */}
                    <div className="flex justify-evenly w-full">
                    <button className=" p-1 pl-2 pr-2  rounded-md text-slate-300 border-2 border-slate-800 flex justify-center items-center text-sm"><UserPlus className="mr-1 stroke-cyan-600" size={17}/>Add Friend</button>
                    <button className=" p-1 pl-2 pr-2 rounded-md text-slate-300 border-2 border-slate-800 flex justify-center items-center text-sm"><Slash className="mr-1 stroke-pink-600" size={17}/>Ignore</button>

                    </div>
                </div>
        </>
    )
}