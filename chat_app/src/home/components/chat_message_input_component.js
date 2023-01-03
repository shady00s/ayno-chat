import EmojiPicker from "emoji-picker-react";
import { useState,useEffect } from "react";
import { Smile } from "react-feather";
import IconButtonWithText from "./icon_button_with_text";
import { Send } from "react-feather";
import StorageManager from "../../utils/storage_manager";
import ApiCall from '../api_call';
import SocketClientManager from './../../sockets/message_socket';

export default function ChatMessageInputComponent(props){

    const [activated,setActivated] = useState(false)
    const [textVal,setTextVal] = useState('')
  
    const user_id = StorageManager.getDataFromStorage().id
    const conversation_id = props.conversation_id

    function sendMessage(){
       
        ApiCall.postUserMessage({
            sender_id:user_id,
            conversation_id:conversation_id,
            message_content:textVal
        }).then(value =>{
            props.socketMessage({message:textVal,sender_id:user_id})
        })
    }

    return(
        <div className=" justify-between items-center border-2 border-gray-800 rounded-md sticky bottom-0 pl-4 pr-4 w-full  bg-background flex">
            <input autoFocus value={textVal} onChange={val =>{ setTextVal( val.target.value)}}   placeholder="Write your text here" className="border-r-2 border-r-slate-700  p-1 w-9/12 bg-transparent text-gray-200" type={'text'}/>


                {/* emoji picker container */}
              { activated===true ?  <div  className="absolute bottom-10   right-2">
                    <EmojiPicker lazyLoadEmojis={false} theme="dark" onEmojiClick={(emoji)=>{
                        

                        setTextVal (textVal + emoji.emoji)
                    }}/>
                </div> : null }
            {/* emoji button */}
            <Smile  color="#505045"  className="cursor-pointer ml-2" onClick={()=>{setActivated(!activated)}}/>
            <IconButtonWithText onClick={()=>{

                sendMessage()
                setTextVal("")
                }} name="Send" icon={Send} isActive={true}/>
            
        </div>
    )
}