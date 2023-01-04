import ChatMessageComponent from "./chat_message_component"
import ChatMessageInputComponent from './chat_message_input_component';
import { useState, useEffect, useRef } from 'react';
import ApiCall from '../../api_call';
import StorageManager from '../../../utils/storage_manager';
import SocketClientManager from '../../../sockets/message_socket';
import LoadingComponent from '../../../reusable-components/loading_component';

const socketRef = SocketClientManager.socketInit()

export default function MessageComponent() {

    const scrollRef = useRef(null)
    const [chat, setChat] = useState([])
    let user_id = StorageManager.getDataFromStorage()
    const [socket, setSocket] = useState(null)
    const [text, setText] = useState("")
    useEffect(() => {
        socketRef.emit("send-message", text)

        if (text !== "") {
            socketRef.on("recive-message", (message) => {
                //add new message that comes from the socket to previous messages
                setSocket(() => socketRef)

                if (message.body !== null) {

                    setChat((prev) => [...prev, message])
                    scrollRef.current.scrollIntoView({ behavior: "smooth" })

                }
            })
        }


    }, [text, socketRef])

    useEffect(() => {

        ApiCall.getUserChatMessages(user_id.id, "63aaee37181289caad5cc5b4").then(messages => {
            setChat(() => messages.data.conversations.messages)
        })

        scrollRef.current.scrollIntoView({ behavior: "smooth" })


    }, [])
    return (
        <div className='sm:h-home-screen flex flex-col   overflow-y-scroll overflow-x-hidden md:w-[45%] w-5/6  h-mobile-height'>
            {chat.length !== 0 ? 

                chat.map(messages => <ChatMessageComponent key={Math.random().toString()} message={messages} isUser={messages.sender_id == user_id.id ? true : false} />)
                : <div className="w-full h-full justify-center items-center"><LoadingComponent /></div>}
            <div ref={scrollRef} />
            <ChatMessageInputComponent socketMessage={(value) => { setText(value) }} conversation_id="63ab380966640e1bdf353f36" friend_id="63aaee37181289caad5cc5b4" />

            <div className='sticky bottom-0 w-full'>



            </div>

        </div>
    )
}