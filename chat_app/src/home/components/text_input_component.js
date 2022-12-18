import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { Smile } from "react-feather";
import IconButtonWithText from "./icon_button_with_text";

export default function TextInputContainer(){

    const [activated,setActivated] = useState(false)
    const [textVal,setTextVal] = useState('')
    return(
        <div className=" justify-between items-center  sticky bottom-0 p-1 w-full h-10 bg-background flex">
            <input autoFocus onChange={(val)=>{setTextVal(val.target.value)}} value={textVal} placeholder="Write your text here" className="border-r-2 border-r-slate-700  p-1 w-9/12 bg-transparent text-gray-200" type={'text'}/>


                {/* emoji picker container */}
              { activated===true ?  <div  className="absolute bottom-10   right-2">
                    <EmojiPicker lazyLoadEmojis={true} theme="dark" onEmojiClick={(emoji)=>{
                        

                        setTextVal (textVal+emoji.emoji)
                    }}/>
                </div> : null }
            {/* emoji button */}
            <Smile  color="#505045"  className="cursor-pointer ml-2" onClick={()=>{setActivated(!activated)}}/>
            <IconButtonWithText name="Send" icon="send" isActive={true}/>
            
        </div>
    )
}