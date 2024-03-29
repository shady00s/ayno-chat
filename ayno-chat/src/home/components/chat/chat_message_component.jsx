import { CheckCircle } from "react-feather";
import { useContext, useEffect } from "react";
import ImageContainer from "../friends/image_container";
import { useSelector } from "react-redux";

export default function ChatMessageComponent(props) {
    const  contact  = useSelector((state)=>state.data.contact)
    const  user  = useSelector((state)=>state.data.user)
    const guestMainContainerStyle = ' bg-[#1E2329]  mr-2';
    const ownerMainContainerStyle = 'bg-[#008FC6] float-right ml-2 ';
    const userProfilePath = contact.profileImagePath
    const imageMessageTester = /(http:..res.cloudinary.com.ssk777.image.upload.)/g

    return (

        <div className="w-full h-full  mb-3">
            <div className={`flex ${props.message.messages.sender_id ===user.id ? "float-right" : "float-left"} items-end`}>
                {/* profile image */}
                <img alt="user profile" src={props.message.messages.sender_id ===user.id?user.profileImagePath:userProfilePath} className="h-7 w-7 p-1 rounded-full" />
                {/* text container */}
                {/* if the message is image link then it will be displayed as image */}
                <div style={{ maxWidth: "23rem", minWidth: "2rem"}} className={`${props.message.messages.sender_id ===user.id ? guestMainContainerStyle : ownerMainContainerStyle} relative rounded-md p-1 break-words inline-block`}>

                    {imageMessageTester.test(props.message.messages.message) === true ?  <ImageContainer image={props.message.messages.message}/>: <p className=" text-slate-200 font-normal pl-2 pr-2">{props.message.messages.message}</p>}
                    {/* seen container */}
                    <div className=" absolute right-0 flex justify-center items-center">
                        <span className="mr-2 text-slate-700 text-xs">seen</span>
                        <CheckCircle className="w-2" color={"#ffffff"} />
                    </div>

                </div>

            </div>
        </div>


    )
}