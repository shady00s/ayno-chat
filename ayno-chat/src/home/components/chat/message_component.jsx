import ChatMessageComponent from "./chat_message_component"
import ChatMessageInputComponent from './chat_message_input_component';
import React, { useState, useEffect, useRef,useContext, useCallback } from 'react';
import ApiCall from '../../../api_call';
//import StorageManager from '../../../utils/storage_manager';
import SocketClientManager from '../../../sockets/message_socket';
//import ContactContext from '../../../context/contactContext';
//import { ChatSkeleton } from "../../../reusable-components/skeleton/chat";
import { io } from 'socket.io-client';
import { useMemo } from 'react';
const socketRef =''


 function MessageComponent() {

    //const  {contact} = useContext(ContactContext)
    
    const [chat, setChat] = useState([])
    const socket = useRef()
    const scrollRef= useRef(null)
   
  //  const useSocketMemo = useMemo(()=>(socket.current = io("ws://192.168.1.4:8080",{transports:['websocket']})),[socket.current])

    const scrollToBottom = () => {
        scrollRef.current?.scrollIntoView({ behavior : "smooth" })
      }


  useEffect(()=>{
        scrollToBottom()
  },[chat])

  // when contact changes api call will triggered to insert new data

    // ApiCall.getUserChatMessages(user_id.id, contact._id).then(messages => {
    
    //     setChat(() => messages.data.conversations.messages)
    // })



    // useEffect(()=>{
    //     useSocketMemo.on("recive-message", (message) => {
       
    //         //add new message that comes from the socket to previous messages      
    //            return setChat((prev) => [...prev, message])
    //     })    
    //     useSocketMemo.on("image",(imageUrl)=>{
    //        return setChat((prev) => [...prev, imageUrl])
    //     })
    //          return () => {
    //             useSocketMemo.removeListener("recive-message")
    //             useSocketMemo.removeListener("image")
            
    //         }
                
    // },[useSocketMemo])
    return (
        <div className='relative flex flex-col  h-[80vh] md:w-[50%] w-[95%]'>

           <div className="flex flex-col  overflow-y-auto h-[95%]">

          
            {/* {chat.length !== 0 ? 

                chat.map(messageComponent =>
                    
                    <div className="m-1 pb-4 border-b-2 p-2  border-b-[rgba(70,70,70,0.1)]" ref={scrollRef}>
                        
                        <ChatMessageComponent key={Math.random().toString()} message={messageComponent} isUser={messageComponent.sender_id == user_id.id ? true : false} /></div>)
                    : <div className="w-full md:h-[75vh] h-[85vh] justify-center items-center"><ChatSkeleton /></div>} */}
        
           
            </div>
            
            <div className=' w-full '>
            {/* <ChatMessageInputComponent socketMessage={(value) => {
                socket.emit("send-message", value)

                 }} conversation_id={""} friend_id={contact._id} /> */}
                 
                 {/* Object.keys(contact).length !==0?contact.conversations.find(id=> user_id.id === id.contact_Id).conversation_Id : ""  */}
            </div>
                
        </div>
    )
}

export default React.memo(MessageComponent)