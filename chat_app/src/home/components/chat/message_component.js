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

    const scrollToBottom = () => {
        scrollRef.current?.scrollIntoView({ behavior : "smooth" })
      }
    useEffect(() => {

        socketRef.emit("send-message", text)

        if (text !== "") {
            socketRef.on("recive-message", (message) => {
                //add new message that comes from the socket to previous messages
                setSocket(() => socketRef)

                if (message.body !== null) {

                    setChat((prev) => [...prev, message])

                }
            })
        }

        scrollToBottom()

    }, [text, socketRef])

    useEffect(() => {

        ApiCall.getUserChatMessages(user_id.id, "63aaee37181289caad5cc5b4").then(messages => {
            setChat(() => messages.data.conversations.messages)
        })

    }, [])
    return (
        <div className=' flex flex-col  h-[90%] overflow-y-scroll overflow-x-hidden md:w-[45%] w-[90%] '>
            {chat.length !== 0 ? 

                chat.map(messages => <ChatMessageComponent key={Math.random().toString()} message={messages} isUser={messages.sender_id == user_id.id ? true : false} />)
                : <div className="w-full h-full justify-center items-center"><LoadingComponent /></div>}
            <div ref={scrollRef} />

            <div className='sticky bottom-0 w-full'>
            <ChatMessageInputComponent socketMessage={(value) => { setText(value) }} conversation_id="63ab380966640e1bdf353f36" friend_id="63aaee37181289caad5cc5b4" />



            </div>

        </div>
    )
}