import EmojiPicker from "emoji-picker-react";
import { useState, useContext, useEffect, useRef } from "react";
import { Smile, Send } from "react-feather";
import IconButtonWithText from "../icon_button_with_text";
import ApiCall from "../../../api_call";
import AddImageComponent from "./add_image_component";
import SocketContext from "./../../../context/socketContext";
import { useSelector } from "react-redux";
export default function ChatMessageInputComponent(props) {
  const [activated, setActivated] = useState(false);
  const [textVal, setTextVal] = useState("");
  const socket = useContext(SocketContext);
  const conversation_id = props.conversation_id;
  const user = useSelector((state) => state.data.user);
  const contact = useSelector((state) => state.data.contact)
  const [userTyping, setUserTyping] = useState(false);
  const finalText = useRef("");
  const isEmptyString = /^\s*$/
  useEffect(() => {
    finalText.current = textVal;
  }, [textVal]);
  function sendMessage() {
    if (contact.type === "contact") {
      ApiCall.postUserMessage({
        conversation_id: conversation_id,
        message_content: finalText.current,
      }).then(()=>{
        
        socket.emit('new-notification', {
          conversations:[{conversation_Id:conversation_id, contact_Id:contact._id}]
          , id: contact._id,
           name:user.name,
            user: user.id ,
            profileImagePath:user.profileImagePath,
             type: "message" })

      });
  
      setTextVal("");
    } else {
      ApiCall.postGroupMessage({
        conversation_id: conversation_id,
        message_content: finalText.current,
        sender_image_path: user.profileImagePath,
        sender_name: user.name,
      }).then(()=>{
        socket.emit('new-notification', {
          conversation_id, 
          id: contact.conversation_id,
          user: user.id,
          sender_id: user.id, 
          type: "group-message",
          sender_name:user.name,
          group_name:contact.name
        })
      });
      setTextVal("");
    }
  }
  useEffect(() => {
    if(contact.type === "contact"){
      socket.emit("isTyping", {
        name: user.name,
        conversation_id:contact._id,
        isTyping: userTyping,
        type:"contact"
      });

    }else{
      socket.emit("isTyping", {
        name: user.name,
        conversation_id,
        isTyping: userTyping,
        type:"group"
      });
    }
  }, [userTyping,conversation_id]);

  return (
    <div className="z-20 justify-between items-center border-2 border-gray-800 rounded-md sticky bottom-0 pl-4 pr-4 w-full  bg-background flex">
      <textarea
        onKeyDown={(key) => {
          if (key.key === "Enter") {
            setUserTyping(false);
            sendMessage();
          } else {
            setUserTyping(true);

            setTimeout(() => {
              setUserTyping(false);
            }, 2000);
          }
        }}
        
        autoFocus
        value={textVal}
        onChange={(val) => {
          setTextVal(val.target.value);
        }}
        placeholder="Write your text here"
        className="border-r-2 h-11 border-r-slate-700 resize-none  p-1 w-8/12 bg-transparent text-gray-200"
        type={"text"}
      />

      {/* emoji picker container */}
      {activated === true ? (
        <div
          className={`${activated ? "opacity-1" : "opacity-0"
            } transition-opacity absolute bottom-10   right-2`}
        ><div className="md:w-7/12 w-8/12">
           <EmojiPicker
            width={"18rem"}
            lazyLoadEmojis={false}
            theme="dark"
            onEmojiClick={(emoji) => {
              setTextVal(textVal + emoji.emoji);
            }}
          />
          </div>
         
        </div>
      ) : null}
      {/* emoji button */}
      <Smile
        color="#505045"
        className="cursor-pointer ml-2 w-14"
        onClick={() => {
          setActivated(!activated);
        }}
      />
      {/* attachButton */}
      <AddImageComponent />

      {/* submit button */}
      <IconButtonWithText
        className={`${isEmptyString.test(textVal) == true ? "w-0 p-0" : "w-auto p-1"}`}
        onClick={() => {
          setUserTyping(false);
          sendMessage();
        }}
        name="Send"
        icon={Send}
        isActive={true}
      />
    </div>
  );
}
