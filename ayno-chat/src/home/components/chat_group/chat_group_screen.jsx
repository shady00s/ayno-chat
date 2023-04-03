import { useState, useEffect } from 'react';
import ApiCall from '../../../api_call';
import EmptyContactComponent from '../friends/empty_contacts_component';
import { ChevronDown } from 'react-feather'
import { FriendListSkeleton } from '../../../reusable-components/skeleton/friend_list';
import GroupChatButtonComponent from './group_chat_button_component';
import { CounterComponent } from '../../../reusable-components/counter_component';
import { useDispatch, useSelector } from 'react-redux';
import { setNewGroup, setNotifications } from '../../../redux/slice';


export default function ChatGroupComponent() {
    const [open, setOpen] = useState(false)
    const [groups, setGroups] = useState([])
    const [loading, setLoading] = useState(false)
    const [numberOfGroups, setNumberOfGroups] = useState(0)
    const notifications = useSelector((state => state.data.notifications))
    const newGroup = useSelector((state) => state.data.newGroup)
    const dispatch = useDispatch()
    const [isNew, setIsNew] = useState(true)
    useEffect(() => {
        setNumberOfGroups(groups.length)
    }, [groups])

    useEffect(() => {
        if (isNew) {
            setLoading(true)
            ApiCall.getGroups().then(data => {
                if (data.status === 200) {
                    setGroups(() => data.data.body)
                    setLoading(false)
                    setIsNew(false)

                } else {
                    setGroups(() => [])
                    setLoading(false)
                    setIsNew(false)

                }
            }).catch(err => {
                alert(err)
                setIsNew(false)
            })
        }

    }, [])
    useEffect(() => {
        if (notifications.newGroupNotifications.length !== 0) {

            setGroups(() => [...groups, ...notifications.newGroupNotifications])
            dispatch(setNotifications({ ...notifications, newGroupNotifications: [] }))
        }
        if (newGroup._id !== null) {
            setGroups(() => [...groups, newGroup])

            dispatch(setNewGroup({
                _id: null,
                conversation_id: null,
                members_ids: [],
                conversation_name: ""
            }))
        }


    }, [newGroup, notifications])
    return (

        <>
            <div className="pt-4 pd-4 w-full">
                <div onClick={() => { setOpen(!open) }} className="flex justify-between pl-2 pt-2 pb-2 pr-3 cursor-pointer hover:bg-[rgba(124,173,219,0.04)]">
                    <h1 className="text-slate-200 select-none">Groups</h1>

                    <div className="flex justify-evenly w-[8rem]">
                        <div ><span className="text-sm text-slate-400">{numberOfGroups} groups</span></div>

                        <ChevronDown className="text-slate-200" />
                    </div>
                </div>
                <div className={`${open ? "h-[30rem] p-1" : "h-[0rem] overflow-hidden"} flex flex-col verflow-y-auto w-full transition-all duration-300 ease-in-out`}>
                    {loading ? <FriendListSkeleton /> : groups.length !== 0 ? groups.map(data => <GroupChatButtonComponent key={data.conversation_id} data={data} />) :

                        <div className="flex justify-center items-center w-full h-full
                    ">

                            <EmptyContactComponent />
                        </div>}


                </div>

            </div>
        </>

    )
}