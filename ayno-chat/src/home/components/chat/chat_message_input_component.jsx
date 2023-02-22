import EmojiPicker from "emoji-picker-react";
import { useState,useContext } from "react";
import { Smile,Send } from "react-feather";
import IconButtonWithText from "../icon_button_with_text";
import ApiCall from '../../../api_call';
import AddImageComponent from "./add_image_component";
import UserContext from './../../../context/userContext';
export default function ChatMessageInputComponent(props){

    const [activated,setActivated] = useState(false)
    const [textVal,setTextVal] = useState('')
  
    const conversation_id = props.conversation_id
    const {user} = useContext(UserContext)
    function sendMessage(){
        if(user.type ==='contact'){
            ApiCall.postUserMessage({        
                conversation_id:conversation_id,
                message_content:textVal,
            }).then(value =>{
                props.socketMessage({message:textVal})
            })
        }else{
            ApiCall.postGroupMessage({
                conversation_id:conversation_id,
                message_content:textVal,
                sender_image_path:user.profileImagePath

            }).then(value =>{
               console.log(value)
            })
        }
       
    }

    return(
        <div className=" justify-between items-center border-2 border-gray-800 rounded-md sticky bottom-0 pl-4 pr-4 w-full  bg-background flex">
            <input autoFocus value={textVal} onChange={val =>{ setTextVal( val.target.value)}}   placeholder="Write your text here" className="border-r-2 border-r-slate-700  p-1 w-9/12 bg-transparent text-gray-200" type={'text'}/>


                {/* emoji picker container */}
              { activated===true ?  <div  className={`${activated?"opacity-1":"opacity-0"} transition-opacity absolute bottom-10   right-2`}>
                    <EmojiPicker  width={"21rem"} lazyLoadEmojis={false} theme="dark" onEmojiClick={(emoji)=>{
                        

                        setTextVal (textVal + emoji.emoji)
                    }}/>
                </div> : null }
            {/* emoji button */}
            <Smile  color="#505045"  className="cursor-pointer ml-2 w-14" onClick={()=>{setActivated(!activated)}}/>
            {/* attachButton */}
            <AddImageComponent/>

        {/* submit button */}
            <IconButtonWithText onClick={()=>{

                sendMessage()
                setTextVal("")
                }} name="Send" icon={Send} isActive={true}/>
            
        </div>
    )
}