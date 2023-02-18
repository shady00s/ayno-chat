import { ChevronDown,CloudRain} from "react-feather"
import { useEffect, useState, useRef, useContext } from 'react';
import ApiCall from './../../../api_call';
import FriendRequestBody from "./friend_request_body";
import { FriendListSkeleton } from "../../../reusable-components/skeleton/friend_list";
import SocketContext from "../../../context/socketContext";
import { CounterComponent } from "../../../reusable-components/counter_component";


export function FriendRequestComponent() {
  

    const [open, setOpen] = useState(false)
    const [friendRequest, setFriendRequest] = useState([])
    const [loading, setLoading] = useState(false)
    const [numberofReq,setNumberOfReq]= useState(0)
    const socketTest = useContext(SocketContext)



    useEffect(()=>{
           // socketTest.emit('send-message',{message_content:'dfdfdfdf'})

            socketTest.on('friend-request',(data)=>{
                if(data !== undefined){
                    console.log(data)
                    setFriendRequest((prev)=>[...prev,data])
                   
                }
               
            })
    },[])

    useEffect(()=>{
        setNumberOfReq(friendRequest.length)

    },[friendRequest])



    useEffect(() => {
        setLoading(true)
        ApiCall.getFriendsRequestList().then(data => {
           if(data.status === 200){
            setFriendRequest(()=>data.data.friendRequests)
            setNumberOfReq(friendRequest.length)

           }else{
            setFriendRequest(()=>[])
           }
           setLoading(false)
            
        })
    }, [])
    return (
        <>
            <div className="pt-4 pd-4">
                <div onClick={()=>{setOpen(!open)}} className="flex justify-between pl-3 pt-2 pb-2 pr-3 cursor-pointer hover:bg-[rgba(124,173,219,0.04)]">
                    <h1 className="text-slate-200 select-none">Friend Requests</h1>
                    <div className="flex justify-evenly w-[5rem]">
                    <CounterComponent number={numberofReq}/>
                    <ChevronDown className="text-slate-200" />
                    </div>
                    
                </div>

                <div className={`${open?"h-[30rem]":"h-[0rem] overflow-hidden"} overflow-y-auto  transition-all duration-300 ease-in-out`}>
                    {loading?<FriendListSkeleton/>:friendRequest.length !==0?friendRequest.map(data=><FriendRequestBody key={data.name} data={data} removeFriendRequest={(removedId)=>{
                        const requests = friendRequest.filter(id=> id.name !== removedId.name )
                        
                        
                        
                        setFriendRequest(requests)
                    }}/> ):<div className="flex flex-col w-full h-full justify-center items-center">
                                <CloudRain size={44} className="p-1 stroke-slate-600 "/>
                            <h1 className="text-slate-400">There is no friend requests found</h1>
                        </div>}  
                
                </div>
            </div>


        </>
    )
}