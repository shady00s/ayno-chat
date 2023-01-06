import ChatMessageComponent from "./chat_message_component"
import ChatMessageInputComponent from './chat_message_input_component';
import { useState, useEffect, useRef,useContext } from 'react';
import ApiCall from '../../api_call';
import StorageManager from '../../../utils/storage_manager';
import SocketClientManager from '../../../sockets/message_socket';
import LoadingComponent from '../../../reusable-components/loading_component';
import ContactContext from "../../../context/contactContext";
import EmptyMessageComponent from './empty_message_component';
import {io} from "socket.io-client"

// const socketRef = SocketClientManager.socketInit()

const socketRef = io("ws://localhost:8080",{autoConnect:true})

export default function MessageComponent() {
    const {contact} = useContext(ContactContext)
    const user_id = StorageManager.getDataFromStorage()
    const scrollRef = useRef(null)
    const [chat, setChat] = useState([])
    const [socket, setSocket] = useState(socketRef)
    const [text, setText] = useState("")

    const scrollToBottom = () => {
        scrollRef.current?.scrollIntoView({ behavior : "smooth" })
      }

      useEffect(() => {
        if(Object.keys(contact).length !==0){
            ApiCall.getUserChatMessages(user_id.id, contact.friendId).then(messages => {
                setChat(() => messages.data.conversations.messages)
            })
        }
        

    }, [contact])
    useEffect(() => {
        setSocket( socketRef)


        if( text !== ""){
                socket.emit("send-message", text)
        
       
    }
    socket.on("recive-message", (message) => {
        //add new message that comes from the socket to previous messages           
            setChat((prev) => [...prev, message])
    })

        scrollToBottom()

    }, [socketRef,text])


    return (
        <div className='relative flex flex-col overflow-y-auto   h-[90vh]  md:w-[50%] w-[95%] '>

            {Object.keys(contact).length !==0 ?<>
            {chat.length !== 0 ? 

                chat.map(messageComponent => <ChatMessageComponent key={Math.random().toString()} message={messageComponent} isUser={messageComponent.sender_id == user_id.id ? true : false} />)
                    : <div className="w-full h-full justify-center items-center"><LoadingComponent /></div>}
            
            </> :<EmptyMessageComponent/>}
          
            
            <div className='sticky bottom-0 left-0 w-full h-15'>
            <ChatMessageInputComponent socketMessage={(value) => { setText(value) }} conversation_id="63ab380966640e1bdf353f36" friend_id="63aaee37181289caad5cc5b4" />



            </div>

        </div>
    )
}