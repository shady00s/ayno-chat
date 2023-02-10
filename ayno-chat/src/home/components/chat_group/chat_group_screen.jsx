import { useState,useEffect } from 'react';
import ApiCall from '../../../api_call';
import EmptyContactComponent from '../friends/empty_contacts_component';
import {ChevronDown} from 'react-feather'
import { FriendListSkeleton } from '../../../reusable-components/skeleton/friend_list';
export default function ChatGroupComponent(){
    const [open, setOpen] = useState(false)
    const [groups, setGroups] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        ApiCall.getFriendsRequestList().then(data => {
            if (data.status === 200) {
                setFriends(() => data.data.friendRequests)
                setLoading(false)
            } else {
                setFriends(() => [])
                setLoading(false)
            }
            
        })
    }, [])
    return(
        
        
          <>
            <div className="pt-4 pd-4">
                <div onClick={() => { setOpen(!open) }} className="flex justify-between pl-3 pt-2 pb-2 pr-3 cursor-pointer hover:bg-[rgba(124,173,219,0.04)]">
                    <h1 className="text-slate-200 select-none">Groups</h1>

                    <ChevronDown className="text-slate-200" />
                </div>
                <div className={`${open ? "h-[30rem]" : "h-[0rem] overflow-hidden"} overflow-y-auto  transition-all duration-300 ease-in-out`}>
                    {loading ? <FriendListSkeleton /> : groups.length !== 0 ? groups.map(data => <ContactButton key={data.name} data={data} />) :
                    
                    <div className="flex justify-center items-center w-full h-full
                    ">

                    <EmptyContactComponent />
                    </div> }


                </div>

            </div>
        </>
    
    )
}