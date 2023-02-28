import { CheckCircle } from "react-feather";
import ContactContext from './../../../context/contactContext';
import { useContext, useEffect } from "react";
import UserContext from './../../../context/userContext';

export default function ChatMessageComponent(props) {
    const { contact } = useContext(ContactContext)
    const { user } = useContext(UserContext)
    useEffect(() => { }, [props.message.sender_image_path])
    const guestMainContainerStyle = ' bg-[#1E2329]  mr-2';
    const ownerMainContainerStyle = 'bg-[#008FC6] float-right ml-2 ';
    const userProfilePath = contact.profileImagePath
    const imageMessageTester = /(http:..res.cloudinary.com.ssk777.image.upload.)/g

    return (

        <div className="w-full h-full  mb-3">
            <div className={`flex ${props.message.sender_id ===user.id ? "float-right" : "float-left"} items-end`}>
                {/* profile image */}
                <img alt="user profile" src={props.message.sender_id ===user.id?user.profileImagePath:userProfilePath} className="h-7 w-7 p-1 rounded-full" />
                {/* text container */}
                {/* if the message is image link then it will be displayed as image */}
                <div style={{ maxWidth: "23rem", minWidth: "2rem", overflowWrap: "break-word" }} className={`${props.message.sender_id ===user.id ? guestMainContainerStyle : ownerMainContainerStyle} relative rounded-md p-1  inline-block`}>

                    {imageMessageTester.test(props.message.messages.message) === true ? <img className="w-30 h-30 object-cover rounded-md p-1 " src={props.message.messages.message} /> : <p className=" text-slate-200 font-normal pl-2 pr-2">{props.message.messages.message}</p>}
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