import ChatMessageComponent from "./chat_message_component"
import ChatMessageInputComponent from './chat_message_input_component';
import React, { useState, useEffect, useRef, useContext, useCallback} from 'react';
import ApiCall from '../../../api_call';
import { ChatSkeleton } from './../../../reusable-components/skeleton/chat';
import LoadingComponent from '../../../reusable-components/loading/loading_component' 
import { Feather } from "react-feather";
import SocketContext from './../../../context/socketContext';
import { useSelector } from "react-redux";
function MessageComponent() {

    const  contact  = useSelector((state)=>state.data.contact)
    const [chat, setChat] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingPagination,setLoadingPagination] = useState(false)
    const [typing,setTyping] = useState(false)
    const scrollRef = useRef(null)
    const socket = useContext(SocketContext)
    const [isUserScrollBack,setIsUserScrollBack]=useState(false)
    const paginationRef = useRef()
    const [page,setPage] = useState(0)
    const [newMessages,setNewMessage]=useState(false)

    const newMessage = useCallback((textVal) => {
        setNewMessage(true)
        return setChat((prev) => [...prev, {messages:{...textVal}}])

    },[socket])

    const newImage = useCallback((textVal) => {
        console.log(textVal)
        setNewMessage(true)

         setChat((prev) => [...prev,{messages: {...textVal}}])

    },[socket])
    const scrollToBottom = () => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        if(isUserScrollBack===false && page ===0){
            scrollToBottom()
        }
        if(newMessages){
            scrollToBottom()
        }
    }, [chat,newMessages])

    // when contact changes api call will triggered to insert new data

    useEffect(() => {
        setIsUserScrollBack(false)
        if (contact._id == null) return
        else{
            setPage(0)
            setLoading(true)
            setNewMessage(false)
            ApiCall.getUserChatMessages(contact.conversations[0].conversation_Id,0).then(messages => {

                if (messages.status === 200) {
                    setChat(() => messages.data.conversations)
                    setLoading(false)
                }

                else {
                    alert('There is an error please try again')
                    setLoading(false)
                }
            }).catch(err=>{
                console.log(err)
            })
        
        }
           
    }, [contact])
    useEffect(() => {
       if(socket.connected){
           socket.on("recive-message",newMessage )
        
           socket.on("images",newImage) 

           socket.on("typing-data",(name,isTyping)=>{
               setTyping(isTyping)
           
           })

           setTyping(false)
    
       }
        return(()=>{
            socket.off("recive-message")
            socket.off("typing-data")
            socket.off("images")
        })
    }, [socket])
    
    return (
        <div className='relative flex flex-col  h-[88vh] md:w-[50%] w-[95%]'>

            <div className="flex flex-col  overflow-y-auto h-[95%]">




                {contact._id ===null ? <div className="flex flex-col justify-center items-center h-full w-full">
                    <Feather className=" stroke-slate-600 m-2" />
                    <h1 className="text-slate-400">Say hi to your friends</h1>
                    <h4 className="text-slate-600 text-sm p-2">Select friend from your contact list and say hi or start to make new connections</h4>

                </div> : loading ? <ChatSkeleton /> : chat.length !== 0 ?
                    <div className="h-full p-1 w-full  overflow-x-hidden flex flex-col justify-center items-start">
                        <div ref={paginationRef} onScroll={()=>{
                            let pages = page
                            if(paginationRef.current.scrollTop === 0){
                               setPage(prev=>pages++)
                               console.log(page);
                               setLoadingPagination(true)
                               setNewMessage(false)

                               ApiCall.getUserChatMessages(contact.conversations[0].conversation_Id,page).then(messages => {

                                if (messages.status === 200) {
                                    setChat((prev) => [...messages.data.conversations,...prev])
                                    setLoadingPagination(false)
                                    console.log(chat.length);
                                }
                
                                else {
                                    alert('There is an error please try again')
                                }
                            })

                            }
                        }} className="h-full p-1 w-full  overflow-x-hidden flex flex-col">
                            {loadingPagination? <div><LoadingComponent/></div>:<></>}
                            {chat.map(messageComponent => <div key={Math.random().toString()} className="m-1 pb-4 border-b-2 p-2  border-b-[rgba(70,70,70,0.1)]" ref={scrollRef}>

                                <ChatMessageComponent message={messageComponent}  /></div>)}

                        </div>
                        {/* typing container */}
                       <div className={`${typing?"opacity-100":"opacity-0"} transition-opacity duration-100 flex rounded-xl m-1 bg-[rgba(79,101,182,0.13)]`}>
                        
                        <span className={"text-slate-300 text-[0.8rem] pl-2 pr-2 p-[0.3rem] "}> Typing...</span>
                        </div> 
                       
                        <div className=' w-full '>
                            <ChatMessageInputComponent conversation_id={contact._id !== null ? contact.conversations[0].conversation_Id : ""} friend_id={contact._id} />

                        </div>
                    </div>



                    : <div className="flex flex-col justify-center items-center h-full w-full overflow-x-hidden">
                        <div className="flex flex-col justify-center items-center h-[90%]">
                        <Feather className=" stroke-slate-600 m-2" />
                        <h1 className="text-slate-400">Say hi to your friends</h1>
                        <h4 className="text-slate-600 text-sm p-2">Select friend from your contact list and say hi or start to make new connections</h4>
                       
                       

                        </div>
                        <div className=' w-full  '>
                            <ChatMessageInputComponent conversation_id={contact._id !== null ? contact.conversations[0].conversation_Id : ""} friend_id={contact._id} />
                        </div>
                    </div>}
            </div>



        </div>
    )
}

export default React.memo(MessageComponent)