import ChatMessageComponent from "./chat_message_component"
import ChatMessageInputComponent from './chat_message_input_component';
import React, { useState, useEffect, useRef, useContext,useMemo } from 'react';
import ApiCall from '../../../api_call';
import ContactContext from '../../../context/contactContext';
import { ChatSkeleton } from './../../../reusable-components/skeleton/chat';

import { Feather } from "react-feather";
import SocketContext from './../../../context/socketContext';

function MessageComponent() {

    const { contact } = useContext(ContactContext)
    const [chat, setChat] = useState([])
    const [loading, setLoading] = useState(false)
    const scrollRef = useRef(null)
    const socket = useContext(SocketContext)
    const user_id = contact.id
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




    useEffect(()=>{
        socket.on('recive-message', (message) => {
            console.log(message)
                
            setChat((prev) => [...prev, message])

        })    
        socket.on("image",(imageUrl)=>{
           return setChat((prev) => [...prev, imageUrl])
        })
            return ()=>{
                socket.removeListener()
            }   

    },[socket])
    return (
        <div className='relative flex flex-col  h-[80vh] md:w-[50%] w-[95%]'>

            <div className="flex flex-col  overflow-y-auto h-[95%]">




                { Object.keys(contact).length === 0? <div className="flex flex-col justify-center items-center h-full w-full">
                        <Feather className=" stroke-slate-600 m-2"/>
                     <h1 className="text-slate-400">Say hi to your friends</h1>
                     <h4 className="text-slate-600 text-sm p-2">Select friend from your contact list and say hi or start to make new connections</h4>
                     
                     </div> :loading ? <ChatSkeleton /> : chat.length !== 0 ?

                    chat.map(messageComponent =>

                        <div key={Math.random().toString()} className="m-1 pb-4 border-b-2 p-2  border-b-[rgba(70,70,70,0.1)]" ref={scrollRef}>

                            <ChatMessageComponent  message={messageComponent} isUser={messageComponent.message.sender_id === user_id? true : false} /></div>)
                    : <div className="flex flex-col justify-center items-center h-full w-full">
                    <Feather className=" stroke-slate-600 m-2"/>
                 <h1 className="text-slate-400">Say hi to your friends</h1>
                 <h4 className="text-slate-600 text-sm p-2">Select friend from your contact list and say hi or start to make new connections</h4>
                 
                 </div> }
            </div>

            <div className=' w-full '>
                <ChatMessageInputComponent socketMessage={(value) => {
                     
                        socket.emit('send-message',value)
                 }} conversation_id={Object.keys(contact).length !==0? contact.conversations[0].conversation_Id:""} friend_id={contact._id} />

            </div>

        </div>
    )
}

export default React.memo(MessageComponent)