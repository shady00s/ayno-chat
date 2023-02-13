import { ChevronDown } from "react-feather"
import { useEffect, useState, useMemo } from 'react';
import EmptyContactComponent from "./empty_contacts_component";
import ApiCall from "../../../api_call";
import ContactButton from "./contact_button";
import { FriendListSkeleton } from "../../../reusable-components/skeleton/friend_list";
import { CounterComponent } from "../../../reusable-components/counter_component";
export default function FriendsList() {
    const [open, setOpen] = useState(false)
    const [friends, setFriends] = useState([])
    const [loading, setLoading] = useState(false)
    const [numberofFriends,setNumberofFriends]= useState(0)


    useEffect(()=>{
            setNumberofFriends(friends.length)
 },[friends])
    useEffect(() => {
        setLoading(true)
        ApiCall.getFriendsList().then(data => {
            console.log(data.data.body.friends)
            if (data.status === 200) {
                setFriends(() => data.data.body.friends)
                setLoading(false)
            } else {
                setFriends(() => [])
                setLoading(false)
            }
            
        })
    }, [])


    return (
        <>
            <div className="pt-4 pd-4">
                <div onClick={() => { setOpen(!open) }} className="flex justify-between pl-3 pt-2 pb-2 pr-3 cursor-pointer hover:bg-[rgba(124,173,219,0.04)]">
                    <h1 className="text-slate-200 select-none">Friends</h1>
                    <div className="flex justify-evenly w-[5rem]">
                        <CounterComponent number={numberofFriends}/>
                    
                    <ChevronDown className="text-slate-200" />
                    </div>
                </div>
                <div className={`${open ? "h-[30rem] p-1" : "h-[0rem] overflow-hidden"} overflow-y-auto  transition-all duration-300 ease-in-out`}>
                    {loading ? <FriendListSkeleton /> : friends.length !== 0 ? friends.map(data => <ContactButton key={data.name} data={data} />) :
                    
                    <div className="flex justify-center items-center w-full h-full
                    ">

                    <EmptyContactComponent />
                    </div> }


                </div>

            </div>
        </>
    )
}