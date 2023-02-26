import { ChevronDown } from "react-feather"
import { useEffect, useState, useMemo,useContext } from 'react';
import EmptyContactComponent from "./empty_contacts_component";
import ApiCall from "../../../api_call";
import ContactButton from "./contact_button";
import { FriendListSkeleton } from "../../../reusable-components/skeleton/friend_list";
import { CounterComponent } from "../../../reusable-components/counter_component";
import CreateChatGroup from "../chat_group/create_chat_group";
import SocketContext from './../../../context/socketContext';
import UserContext from './../../../context/userContext';
export default function FriendsList() {
    const [open, setOpen] = useState(false)
    const [friends, setFriends] = useState([])
    const [loading, setLoading] = useState(false)
    const [numberofFriends,setNumberofFriends]= useState(0)
    const [selectedIndex,setSelectedIndex] = useState()
    const socket = useContext(SocketContext)
    const {user} = useContext(UserContext)
    const [online,setOnline] = useState([])
    useEffect(()=>{
            setNumberofFriends(friends.length)
 },[friends])
    useEffect(() => {

        socket.emit('online',user.id)

        socket.on('online-users', (users)=>{setOnline(()=>users)})
        setLoading(true)
        ApiCall.getFriendsList().then(data => {
            if (data.status === 200) {
                setFriends(() => data.data.body.friends)
                setLoading(false)
            } else {
                setFriends(() => [])
                setLoading(false)
            }
            
        })
    }, [socket])


    return (
        <>
            <div className="pt-4 pd-4 ">
                <div onClick={() => { setOpen(!open) }} className=" flex justify-between pl-3 pt-2 pb-2 pr-3 cursor-pointer hover:bg-[rgba(124,173,219,0.04)]">
                    <h1 className="text-slate-200 select-none">Friends</h1>
                    <div className="flex justify-evenly w-[5rem]">
                        <CounterComponent number={numberofFriends}/>
                    
                    <ChevronDown className="text-slate-200" />
                    </div>
                </div>
                <div className={`${open ? "h-[30rem] p-1" : "h-[0rem] overflow-hidden"} relative overflow-y-auto  transition-all duration-300 ease-in-out`}>
                    {loading ? <FriendListSkeleton /> : friends.length !== 0 ? friends.map((data,index) => <ContactButton
                    isActive={online.find(id=>id.id === data._id) !== undefined?true:false}
                    onClick={()=>{ 
                        console.log(data)
                        setSelectedIndex(()=>index)
                    }}  key={data.name} data={data}  selected={selectedIndex === index?true:false}/>) :
                    
                    <div className="flex justify-center items-center w-full h-full
                    ">
                    <EmptyContactComponent />
                    </div> }
                    <div className=" absolute bottom-8 right-10">
                        <CreateChatGroup/>
                    </div>
                </div>
                   
            </div>
        </>
    )
}