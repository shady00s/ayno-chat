import ChatMessageComponent from './chat_message_component';
import TextInputContainer from './text_input_component';
import { useState, useEffect } from 'react';
import ApiCall from './../api_call';
import StorageManager from './../../utils/storage_manager';

export default function MessageComponent(){
    const [chat,setChat]=useState([])
    useEffect(()=>{
        console.log("message component called")

    //    let user_id = StorageManager.getDataFromStorage()
    //     ApiCall.getUserChatMessages(user_id.name)

    },[])
    return(
        <div className='sm:h-home-screen overflow-scroll md:w-5/12 w-5/6  h-mobile-height'>
            <ChatMessageComponent isUser={false}/>
            <ChatMessageComponent isUser={true}/>

            <ChatMessageComponent isUser={false}/>
            <ChatMessageComponent isUser={true}/> 
            <ChatMessageComponent isUser={true}/>
            <ChatMessageComponent isUser={true}/>
            <ChatMessageComponent isUser={true}/>
            <ChatMessageComponent isUser={true}/>
            <ChatMessageComponent isUser={true}/>
            <ChatMessageComponent isUser={true}/>

            <TextInputContainer/>
        </div>
    )
}