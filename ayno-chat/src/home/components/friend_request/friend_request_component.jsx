import { ChevronDown,CloudRain} from "react-feather"
import { useEffect, useState, useRef, useContext } from 'react';
import ApiCall from './../../../api_call';
import FriendRequestBody from "./friend_request_body";
import { FriendListSkeleton } from "../../../reusable-components/skeleton/friend_list";
import NotificationContext from './../../../context/notificationContext';


export function FriendRequestComponent() {
  

    const [open, setOpen] = useState(false)
    const [friendRequest, setFriendRequest] = useState([])
    const [loading, setLoading] = useState(false)
    const [numberofReq,setNumberOfReq]= useState(0)

    const {notifications,setNotifications} = useContext(NotificationContext)
   
  

 

    useEffect(()=>{
        if(friendRequest.length !==0){
            setFriendRequest(()=>[...friendRequest,...notifications.friendRequestNotification])

        }else{
            setFriendRequest(()=>[...notifications.friendRequestNotification])
 
        }

    },[notifications])

    useEffect(() => {
            setLoading(true)
            ApiCall.getFriendsRequestList().then(data => {
               if(data.status === 200 && data.data.friendRequests.length !==0){
                setFriendRequest(()=>[...friendRequest,...data.data.friendRequests])

               }
               setLoading(false)
                
            })

    }, [])
    useEffect(()=>{
        setNumberOfReq(friendRequest.length)

    },[friendRequest])
    return (
        <>
            <div className="pt-4 pd-4">
                <div onClick={()=>{setOpen(!open)}} className="flex justify-between pl-3 pt-2 pb-2 pr-3 cursor-pointer hover:bg-[rgba(124,173,219,0.04)]">
                    <h1 className="text-slate-200 select-none">Friend Requests</h1>
                    <div className="flex justify-evenly w-[8rem]">
                    <div ><span className="text-sm text-slate-400">{numberofReq} requests</span></div>
                    <ChevronDown className="text-slate-200" />
                    </div>
                    
                </div>

                <div className={`${open?"h-[30rem]":"h-[0rem] overflow-hidden"} overflow-y-auto  transition-all duration-300 ease-in-out`}>
                    {loading?<FriendListSkeleton/>:friendRequest.length !==0?friendRequest.map(data=><FriendRequestBody key={data.name} data={data} removeFriendRequest={(removedId)=>{
                        const requests = friendRequest.filter(id=> id._id !== removedId._id )
                      setFriendRequest(()=>requests)
                      let editedNotifications = notifications

                      editedNotifications.friendRequestNotification = requests

                      setNotifications(()=>editedNotifications)
                    }}/> ):<div className="flex flex-col w-full h-full justify-center items-center">
                                <CloudRain size={44} className="p-1 stroke-slate-600 "/>
                            <h1 className="text-slate-400">There is no friend requests found</h1>
                        </div>}  
                
                </div>
            </div>


        </>
    )
}