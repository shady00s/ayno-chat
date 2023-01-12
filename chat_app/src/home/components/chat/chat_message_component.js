import { CheckCircle } from "react-feather";
import StorageManager from "../../../utils/storage_manager";

export default function ChatMessageComponent(props){
    const guestMainContainerStyle = ' bg-[#1E2329]  mr-2';
    const ownerMainContainerStyle = 'bg-[#008FC6] float-right ml-2 ';
    const userProfilePath = StorageManager.getDataFromStorage().profilePath

    return (
        <>      

                   {/* main container */}
                   <div className="w-full h-full  mb-3">
                    <div className={`flex ${props.isUser ? "float-right":"float-left"} items-end`}>
                        {/* profile image */}
                        <img alt="user profile" src={props.isUser?userProfilePath:props.message.sender_image_path} className="h-7 w-7 p-1 rounded-full"/>
                    {/* text container */}
                    <div  style={{maxWidth:"23rem" ,minWidth:"2rem",overflowWrap:"break-word"}} className={`${props.isUser?guestMainContainerStyle:ownerMainContainerStyle} relative rounded-md p-1  inline-block`}>
                        <p className=" text-slate-200 font-normal pl-2 pr-2">{props.message.message}</p>  
                        {/* seen container */}
                        <div className=" absolute right-0 flex justify-center items-center">
                            <span className="mr-2 text-slate-700 text-xs">seen</span>
                            <CheckCircle className="w-2"  color={"#ffffff"}/>   
                        </div>

                        </div>
                   
                    </div>
                   </div>   
        </>
        
    )
}