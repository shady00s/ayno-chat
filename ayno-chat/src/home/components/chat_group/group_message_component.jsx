import { useContext, useEffect, useState, useRef } from 'react';
import ContactContext from '../../../context/contactContext';
import ApiCall from '../../../api_call';
import { Feather } from 'react-feather';
import ChatMessageInputComponent from './../chat/chat_message_input_component';
import SocketContext from './../../../context/socketContext';
import { ChatSkeleton } from './../../../reusable-components/skeleton/chat';
import UserContext from './../../../context/userContext';
import GroupMessage from './group_message';

export default function GroupMessageComponent() {
    const socket = useContext(SocketContext)
    const { contact } = useContext(ContactContext)
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const { user } = useContext(UserContext)
    const user_id = user.id
    const scrollRef = useRef(null)
    const scrollToBottom = () => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    useEffect(() => {
        if (Object.keys(contact).length === 0) return
        setLoading(true)
        ApiCall.getGroupMessges(contact.conversation_id).then(val => {

            if (val.status === 200) {
                setMessages(() => val.data.body.messages)
                setLoading(false)
            } else {
                setMessages(() => [])
                setLoading(false)
            }
        })
    }, [contact])

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        if(socket.connected){
            socket.on('recive-group-message', (message) => {
                return setMessages(prev => [...prev, message])
            })

        }

        return () => { socket.off('recive-group-message') }
    }, [socket])

    return (
        <div className='relative flex flex-col  h-[88vh] md:w-[50%] w-[95%]'>

            <div className="flex flex-col  overflow-y-auto h-[95%]">



                {Object.keys(contact).length === 0 ? <div className="flex flex-col justify-center items-center h-full w-full">
                    <Feather className=" stroke-slate-600 m-2" />
                    <h1 className="text-slate-400">Say hi to your friends</h1>
                    <h4 className="text-slate-600 text-sm p-2">Select friend from your contact list and say hi or start to make new connections</h4>

                </div> : loading ? <ChatSkeleton /> : chat.length !== 0 ?

<div className="h-full p-1 w-full  overflow-x-hidden flex flex-col">
<div className="h-full p-1 w-full  overflow-x-hidden flex flex-col">
    {chat.map(messageComponent => <div key={Math.random().toString()} className="m-1 pb-4 border-b-2 p-2  border-b-[rgba(70,70,70,0.1)]" ref={scrollRef}>

        <GroupMessage message={messageComponent} isUser={messageComponent.message.sender_id === user_id ? true : false} /></div>)}

</div>
<div className=' w-full '>
    <ChatMessageInputComponent conversation_id={Object.keys(contact).length !== 0 ? contact.conversations[0].conversation_Id : ""} friend_id={contact._id} />

</div>
</div>




                    : <div className="flex flex-col justify-center items-center h-full w-full">
                        <Feather className=" stroke-slate-600 m-2" />
                        <h1 className="text-slate-400">Say hi to your friends   </h1>
                        <h4 className="text-slate-600 text-sm p-2">Select friend from your contact list and say hi or start to make new connections</h4>

                    </div>}


            </div>

        </div>
    )
}