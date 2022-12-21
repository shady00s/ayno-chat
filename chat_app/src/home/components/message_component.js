import ChatMessageComponent from './chat_message_component';
import TextInputContainer from './text_input_component';
import { useState, useEffect } from 'react';
import ApiCall from './../api_call';
import StorageManager from './../../utils/storage_manager';

export default function MessageComponent(){
    const [chat,setChat]=useState([])

    useEffect(()=>{
       let user_id = StorageManager.getDataFromStorage()
        ApiCall.getUserChatMessages(user_id.name)
    },[])
    return(
        <div style={{height:"88%"}} className='ml-2 flex w-10/12 flex-col xl:w-5/12 bg-subBackGround overflow-y-auto'>
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