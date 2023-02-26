import ChatMessageComponent from "./chat_message_component"
import ChatMessageInputComponent from './chat_message_input_component';
import React, { useState, useEffect, useRef, useContext, useMemo ,useCallback} from 'react';
import ApiCall from '../../../api_call';
import ContactContext from '../../../context/contactContext';
import { ChatSkeleton } from './../../../reusable-components/skeleton/chat';

import { Feather } from "react-feather";
import SocketContext from './../../../context/socketContext';
import UserContext from './../../../context/userContext';

function MessageComponent() {

    const { contact } = useContext(ContactContext)
    const {user}=useContext(UserContext)
    const [chat, setChat] = useState([])
    const [loading, setLoading] = useState(false)
    const [typing,setTyping] = useState(false)
    const scrollRef = useRef(null)
    const socket = useContext(SocketContext)
    const newMessage = useCallback((textVal) => {
        console.log(textVal)
        return setChat((prev) => [...prev, textVal])

    })

    //  const useSocketMemo = useMemo(()=>(socket.current = io("ws://192.168.1.4:8080",{transports:['websocket']})),[socket.current])
    const scrollToBottom = () => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [chat])

    // when contact changes api call will triggered to insert new data

    useEffect(() => {
        if (Object.keys(contact).length !== 0) {
            setLoading(true)
            ApiCall.getUserChatMessages(contact._id).then(messages => {

                if (messages.status === 200) {
                    setChat(() => messages.data.conversations.messages)
                    setLoading(false)
                }

                else {
                    alert('There is an error please try again')
                    setLoading(false)
                }
            })
        }
    }, [contact])



    useEffect(() => {
       
            socket.on("recive-message",newMessage )
            socket.on("typing-data",(name,isTyping)=>{
                setTyping(isTyping)
                console.log(name,isTyping)
            
            })
            setTyping(false)
        socket.on("image", (imageUrl) => {
            return setChat((prev) => [...prev, imageUrl])
        })
        return(()=>{
            socket.off("recive-message")
            socket.off("typing-data")
        })
    }, [socket])
    return (
        <div className='relative flex flex-col  h-[88vh] md:w-[50%] w-[95%]'>

            <div className="flex flex-col  overflow-y-auto h-[95%]">




                {Object.keys(contact).length === 0 ? <div className="flex flex-col justify-center items-center h-full w-full">
                    <Feather className=" stroke-slate-600 m-2" />
                    <h1 className="text-slate-400">Say hi to your friends</h1>
                    <h4 className="text-slate-600 text-sm p-2">Select friend from your contact list and say hi or start to make new connections</h4>

                </div> : loading ? <ChatSkeleton /> : chat.length !== 0 ?
                    <div className="h-full p-1 w-full  overflow-x-hidden flex flex-col justify-center items-start">
                        <div className="h-full p-1 w-full  overflow-x-hidden flex flex-col">
                            {chat.map(messageComponent => <div key={Math.random().toString()} className="m-1 pb-4 border-b-2 p-2  border-b-[rgba(70,70,70,0.1)]" ref={scrollRef}>

                                <ChatMessageComponent message={messageComponent}  /></div>)}

                        </div>
                        {/* typing container */}
                       <div className={`${typing?"opacity-100":"opacity-0"} transition-opacity duration-100 flex rounded-xl m-1 bg-[rgba(79,101,182,0.13)]`}>
                        
                        <span className={"text-slate-300 text-[0.8rem] pl-2 pr-2 p-[0.3rem] "}> Typing...</span>
                        </div> 
                       
                        <div className=' w-full '>
                            <ChatMessageInputComponent conversation_id={Object.keys(contact).length !== 0 ? contact.conversations[0].conversation_Id : ""} friend_id={contact._id} />

                        </div>
                    </div>



                    : <div className="flex flex-col justify-center items-center h-full w-full">
                        <Feather className=" stroke-slate-600 m-2" />
                        <h1 className="text-slate-400">Say hi to your friends</h1>
                        <h4 className="text-slate-600 text-sm p-2">Select friend from your contact list and say hi or start to make new connections</h4>

                    </div>}
            </div>



        </div>
    )
}

export default React.memo(MessageComponent)