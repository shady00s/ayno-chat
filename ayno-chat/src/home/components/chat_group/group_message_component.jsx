import { useContext, useEffect, useState, useRef, useCallback } from 'react';
import ApiCall from '../../../api_call';
import { Feather } from 'react-feather';
import ChatMessageInputComponent from './../chat/chat_message_input_component';
import SocketContext from './../../../context/socketContext';
import { ChatSkeleton } from './../../../reusable-components/skeleton/chat';
import GroupMessage from './group_message';
import { Plus } from 'react-feather';
import NavigationContext from './../../../context/navigationContext';
import AddNewVote from './vote/add_new_vote_component';
import VoteComponent from './vote/vote_component';
import { useDispatch, useSelector } from 'react-redux';
export default function GroupMessageComponent() {
    const socket = useContext(SocketContext)
    const contact = useSelector((state) => state.data.contact)
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const user = useSelector((state) => state.data.user)
    const user_id = user.id
    const scrollRef = useRef(null)
    const { setNavigation } = useContext(NavigationContext)
    const scrollToBottom = () => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    useEffect(() => {
        if (contact._id === null) return

        setLoading(true)
        ApiCall.getGroupMessges(contact.conversation_id, 0).then(val => {
            if (val.status === 200) {
                setMessages(() => val.data.conversations)
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
    const messagesCallBack = useCallback((message) => {

        setMessages(prev => [...prev, { messages: { ...message } }])
    }, [socket])
    useEffect(() => {
        if (socket.connected) {
            socket.on('recive-group-message', messagesCallBack)
            socket.on("images", (images) => {
                setMessages(prev => [...prev, { messages: { ...images } }])
            })

        }

        return () => {
            socket.off('recive-group-message')
            socket.off('images')
        }
    }, [socket])

    return (
        <div className='relative flex flex-col  h-[88vh] md:w-[50%] w-[95%]'>
            <div className="flex flex-col  overflow-y-auto h-[95%]">



                {contact._id === null ? <div className="flex flex-col justify-center items-center h-full w-full">
                    <Feather className=" stroke-slate-600 m-2" />
                    <h1 className="text-slate-400">Say hi to your friends</h1>
                    <h4 className="text-slate-600 text-sm p-2">Select friend from your contact list and say hi or start to make new connections</h4>

                </div> : loading ? <ChatSkeleton /> : messages.length !== 0 ?

                    <div className="h-[99%] p-1 w-full  overflow-x-hidden flex flex-col relative">
                        <div className='flex justify-end p-1'>
                            <div onClick={() => [
                                setNavigation('vote-menu')
                            ]} className='flex cursor-pointer hover:bg-[rgba(120,120,120,0.2)] p-1 rounded-md'><Plus className=' stroke-slate-500' /> <span className='text-slate-500'>Add vote</span></div>
                        </div>
                        <AddNewVote />
                        <div className=" p-1 w-full h-full overflow-x-hidden  overflow-y-auto flex flex-col">
                            {messages.map((messageComponent, index) => <div>

                                <div key={Math.random().toString()} className="m-1 pb-4 border-b-2 p-2  border-b-[rgba(70,70,70,0.1)]" ref={scrollRef}>
                                    {messageComponent.messages.type === "vote" && messageComponent.messages.message === "s" ? <VoteComponent key={Math.random().toString()} message={messageComponent.messages} /> : <GroupMessage key={Math.random().toString()} message={messageComponent.messages} isUser={messageComponent.messages.sender_id === user_id ? true : false} />}
                                </div>

                            </div>)}
                           

                        </div>
                        {/* typing container */}
                       <div className={`${typing?"opacity-100":"opacity-0"} transition-opacity duration-100 flex rounded-xl m-1 bg-[rgba(79,101,182,0.13)]`}>
                        
                        <span className={"text-slate-300 text-[0.8rem] pl-2 pr-2 p-[0.3rem] "}> Typing...</span>
                        </div> 
                        <div className=' w-full '>
                                <ChatMessageInputComponent conversation_id={contact._id !== null ? contact.conversation_id : ""} friend_id={contact._id} />

                            </div>
                    </div>




                    : <div className='overflow-hidden h-[99%] w-full flex flex-col'>
                        <div className="flex flex-col justify-center items-center h-full w-full">
                            <Feather className=" stroke-slate-600 m-2" />
                            <h1 className="text-slate-400">Say hi to your friends   </h1>
                            <h4 className="text-slate-600 text-sm p-2">Select friend from your contact list and say hi or start to make new connections</h4>

                        </div>
                        {/* typing container */}
                       <div className={`${typing?"opacity-100":"opacity-0"} transition-opacity duration-100 flex rounded-xl m-1 bg-[rgba(79,101,182,0.13)]`}>
                        
                        <span className={"text-slate-300 text-[0.8rem] pl-2 pr-2 p-[0.3rem] "}> Typing...</span>
                        </div> 

                        <div className=' w-full '>
                            <ChatMessageInputComponent conversation_id={contact._id !== null ? contact.conversation_id : ""} friend_id={contact._id} />

                        </div>

                    </div>
                }

            </div>

        </div>
    )
}