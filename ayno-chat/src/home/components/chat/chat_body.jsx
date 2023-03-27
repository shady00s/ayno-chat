
import { useEffect,useState,useContext } from 'react';
import MessageComponent from './message_component';
import GroupMessageComponent from '../chat_group/group_message_component';
import { useSelector } from 'react-redux';
export default function ChatBodyComponent(){

    const contact = useSelector((state)=>state.data.contact)

    
        return(
        <>
            {contact.type==="contact"?<MessageComponent/>: <GroupMessageComponent/>}
        </>
        )
   
       
    
    
}