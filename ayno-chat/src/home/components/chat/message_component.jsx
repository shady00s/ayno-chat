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
    const [typingData,setTyping] = useState({typing:false,type:""})
    const scrollRef = useRef(null)
    const socket = useContext(SocketContext)
    const [isUserScrollBack,setIsUserScrollBack]=useState(false)
    const paginationRef = useRef()
    const [page,setPage] = useState(0)
    const [newMessages,setNewMessage]=useState(false)
    const user = useSelector((state)=>state.data.user)

    const newMessage = useCallback((textVal) => {
        setNewMessage(true)
        return setChat((prev) => [...prev, {messages:{...textVal}}])
    },[socket])

    const newImage = useCallback((textVal)=>{
        setChat(() => [...chat,{messages: {...textVal}}])
        setNewMessage(true)
    },[socket])

    const typing = useCallback((name,isTyping,type)=>{
        setTyping(()=>({typing:isTyping,type:type}))
     
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

    function getPrevMessages(){
        let pages = page
        if(paginationRef.current.scrollTop === 0 &&chat.length ==50 ){
           setPage(()=>pages++)
           setLoadingPagination(true)
           setNewMessage(false)

           ApiCall.getUserChatMessages(contact.conversations[0].conversation_Id,page).then(messages => {

            if (messages.status === 200) {
                setChat((prev) => [...messages.data.conversations,...prev])
                setLoadingPagination(false)
            }

            else {
                alert('There is an error please try again')
            }
        })

        }
    }
    // when contact changes api call will triggered to insert new data

    useEffect(() => {
        setIsUserScrollBack(false)
        if (contact._id == null) return
       
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
        
           
    }, [contact])
    useEffect(()=>{
        socket.on("images",newImage)
    },[socket])

    useEffect(() => {
       if(socket.connected){
           socket.on("recive-message",newMessage )
        
            

           socket.on("typing-data",typing)

           

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
                           getPrevMessages()
                        }} className="h-full p-1 w-full  overflow-x-hidden flex flex-col">
                            {loadingPagination? <div><LoadingComponent/></div>:<></>}
                            {chat.map(messageComponent => <div key={Math.random().toString()} className="m-1 pb-4 border-b-2 p-2  border-b-[rgba(70,70,70,0.1)]" ref={scrollRef}>

                                <ChatMessageComponent message={messageComponent}  /></div>)}

                        </div>
                        {/* typing container */}
                       <div className={`${typingData.typing && typingData.type==="contact" ? "opacity-100":"opacity-0"} transition-opacity duration-100 flex rounded-xl m-1 bg-[rgba(79,101,182,0.13)]`}>
                        
                        <span className={"text-slate-300 text-[0.8rem] pl-2 pr-2 p-[0.3rem] "}> Typing...</span>
                        </div> 
                       
                        <div className=' w-full '>
                            <ChatMessageInputComponent conversation_id ={ contact._id !== null ? contact.conversations.find((data)=>data.contact_Id === user.id).conversation_Id : ""} friend_id={contact._id} />

                        </div>
                    </div>



                    : <div className="flex flex-col justify-center items-center h-full w-full overflow-x-hidden">
                        <div className="flex flex-col justify-center items-center h-[90%]">
                        <Feather className=" stroke-slate-600 m-2" />
                        <h1 className="text-slate-400">Say hi to your friends</h1>
                        <h4 className="text-slate-600 text-sm p-2">Select friend from your contact list and say hi or start to make new connections</h4>
                       
                       

                        </div>
                        <div className=' w-full  '>
                            <ChatMessageInputComponent conversation_id={contact._id !== null ? contact.conversations.find((data)=>data.contact_Id === user.id).conversation_Id : ""} friend_id={contact._id} />
                        </div>
                    </div>}
            </div>



        </div>
    )
}

export default React.memo(MessageComponent)