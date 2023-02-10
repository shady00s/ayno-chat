import { ChevronDown} from "react-feather"
import { useEffect, useState, useMemo } from 'react';
import ApiCall from './../../../api_call';
import FriendRequestBody from "./friend_request_body";

export function FriendRequestComponent() {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        ApiCall.getFriendsRequestList().then(data => {
            console.log(data.data.friendRequests)
        })
    }, [])
    return (
        <>
            <div className="pt-4 pd-4">
                <div onClick={()=>{setOpen(!open)}} className="flex justify-between pl-3 pt-2 pb-2 pr-3 cursor-pointer hover:bg-[rgba(124,173,219,0.04)]">
                    <h1 className="text-slate-200 select-none">Friend Requests</h1>

                    <ChevronDown className="text-slate-200" />
                </div>

                <div className={`${open?"h-[30rem]":"h-[0rem] overflow-hidden"} overflow-y-auto  transition-all duration-300 ease-in-out`}>
                  
                <FriendRequestBody/>
                </div>
            </div>


        </>
    )
}