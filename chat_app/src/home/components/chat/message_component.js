import ChatMessageComponent from "./chat_message_component"
import ChatMessageInputComponent from './chat_message_input_component';
import React, { useState, useEffect, useRef,useContext, useCallback } from 'react';
import ApiCall from '../../api_call';
import StorageManager from '../../../utils/storage_manager';
import SocketClientManager from '../../../sockets/message_socket';
import LoadingComponent from '../../../reusable-components/loading/loading_component';
import EmptyMessageComponent from './empty_message_component';
import {io} from "socket.io-client"
import ContactContext from './../../../context/contactContext';

// const socketRef = SocketClientManager.socketInit()


 function MessageComponent() {
    const socketData = io("ws://localhost:8080")
    const  {contact} = useContext(ContactContext)

    const user_id = StorageManager.getDataFromStorage()
    const [chat, setChat] = useState([])
    const [socket] = useState(socketData)
    const scrollRef= useRef(null)



    const scrollToBottom = () => {
        scrollRef.current?.scrollIntoView({ behavior : "smooth" })
      }

      const socketCall = useCallback(()=>{

        ApiCall.getUserChatMessages(user_id.id, contact._id).then(messages => {
            setChat(() => messages.data.conversations.messages)
            scrollToBottom()
        })
       
       
    
      },[socket])

    useEffect(()=>{
        
        socketCall()    
        socket.on("recive-message", (message) => {
            console.log(message)
            //add new message that comes from the socket to previous messages      
            scrollToBottom()     
               return setChat((prev) => [...prev, message])
        })
            
             
             return () => socket.removeListener("recive-message")
                
    },[socket])
    return (
        <div className='relative flex flex-col overflow-y-auto   h-[90vh]  md:w-[50%] w-[95%] '>

           
            {chat.length !== 0 ? 

                chat.map(messageComponent => <ChatMessageComponent key={Math.random().toString()} message={messageComponent} isUser={messageComponent.sender_id == user_id.id ? true : false} />)
                    : <div className="w-full h-full justify-center items-center"><LoadingComponent /></div>}
            <div ref={scrollRef}/>
           
          
            
            <div className='sticky bottom-0 left-0 w-full h-15'>
            <ChatMessageInputComponent socketMessage={(value) => {
                socket.emit("send-message", value)

                 }} conversation_id={Object.keys(contact).length !==0?contact.conversations.find(id=> user_id.id === id.contact_Id).conversation_Id : "" } friend_id={contact._id} />
            </div>
                
        </div>
    )
}

export default React.memo(MessageComponent)