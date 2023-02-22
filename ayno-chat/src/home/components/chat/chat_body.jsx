
import { useEffect,useState,useContext } from 'react';
import ContactContext from './../../../context/contactContext';
import MessageComponent from './message_component';
import GroupMessageComponent from '../chat_group/group_message_component';
export default function ChatBodyComponent(){

    const {contact} = useContext(ContactContext)

    if(contact.type ==='contact'){
        return(
        <>
            <MessageComponent/>
        </>
        )
    }else{
        return(
        <>
            <GroupMessageComponent/>
        </>
        )
       
    }
    
}