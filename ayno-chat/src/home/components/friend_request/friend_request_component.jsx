import { ChevronDown,CloudRain} from "react-feather"
import { useEffect, useState, useRef, useContext } from 'react';
import ApiCall from './../../../api_call';
import FriendRequestBody from "./friend_request_body";
import { FriendListSkeleton } from "../../../reusable-components/skeleton/friend_list";
import { useSelector, useDispatch } from 'react-redux';
import { setNotifications } from "../../../redux/slice";
import NavigationContext from "../../../context/navigationContext";


export function FriendRequestComponent() {
  

    const [open, setOpen] = useState(false)
    const [friendRequest, setFriendRequest] = useState([])
    const [loading, setLoading] = useState(false)
    const [numberofReq,setNumberOfReq]= useState(0)
    const [firstload,setFirstLoad]=useState(true)
    const {navigation}= useContext(NavigationContext)
    const setNotification = useDispatch()
   
    const notifications = useSelector((state)=>state.data.notifications)

    function removeFriend(removedId){
                       
                       
        const requests = friendRequest.filter(id=> id._id !== removedId._id )
        
        let editedNotifications = {...notifications}
        
        editedNotifications.friendRequestsNotifications = requests
        
        setNotification(setNotifications(editedNotifications))

        setFriendRequest(()=>requests)
     }

    useEffect(()=>{
            setFriendRequest(()=>([...notifications.friendRequestsNotifications]))
 
        

    },[notifications])
    useEffect(()=>{
        if(navigation.target==="friendRequest"){
            setOpen(()=>true)
        }
    },[navigation])
    useEffect(() => {
            setLoading(true)
            if (firstload){
                ApiCall.getFriendsRequestList().then(data => {
                   if(data.status === 200 ){
                    setFriendRequest(()=>data.data.friendRequests)
    
                   }
                   setLoading(false)
                   setFirstLoad(false)
                    
                })

            }

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
                    {loading?<FriendListSkeleton/>:friendRequest.length !==0?friendRequest.map(data=><FriendRequestBody key={data.name} data={data} removeFriendRequest={(removedId)=>{removeFriend(removedId)}}/> ):<div className="flex flex-col w-full h-full justify-center items-center">
                                <CloudRain size={44} className="p-1 stroke-slate-600 "/>
                            <h1 className="text-slate-400">There is no friend requests found</h1>
                        </div>}  
                
                </div>
            </div>


        </>
    )
}