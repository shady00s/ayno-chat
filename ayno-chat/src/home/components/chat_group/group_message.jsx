import { useEffect,useContext,useState } from "react"; 
import UserContext from "../../../context/userContext";
import ContactContext from "../../../context/contactContext";
import { CheckCircle } from "react-feather";
export default function GroupMessage(props){
    const { user } = useContext(UserContext)
    const {contact}=useContext(ContactContext)
    const [guestColor,setGuestColor] = useState("")
    useEffect(() => { 

        for (let index = 0; index < contact.members_colors.length; index++) {
            if(contact.members_colors[index].id=== props.message.sender_id){
                return setGuestColor(()=>contact.members_colors[index].color)
            }
            
        }
        
    }, [props.message])

    const guestMainContainerStyle = ` bg-[${guestColor}]  mr-2`;
    const ownerMainContainerStyle = `bg-[#1E2329] float-right ml-2 `;
    const imageMessageTester = /(http:..res.cloudinary.com.ssk777.image.upload.)/g

   
    return (

        <div className="w-full h-full  mb-3">
            <div className={`flex ${props.isUser ? "float-right" : "float-left"} items-end`}>
                {/* profile image */}
                <img alt="user profile" src={props.isUser?user.profileImagePath:props.message.sender_image_path} className="h-7 w-7 p-1 rounded-full" />
                {/* text container */}
                {/* if the message is image link then it will be displayed as image */}
                <div className="flex flex-col">
                <span className="text-slate-400 text-[0.75rem] p-1">{props.message.sender_name}</span>

                <div style={{ maxWidth: "23rem", minWidth: "2rem", overflowWrap: "break-word" }} className={`${props.isUser ? ownerMainContainerStyle :guestMainContainerStyle} relative rounded-md p-1  inline-block`}>
                    {imageMessageTester.test(props.message.message) === true ? <img className="w-30 h-30 object-cover rounded-md p-1 " src={props.message.message} /> : <p className=" text-slate-200 font-normal pl-2 pr-2">{props.message.message}</p>}
                    {/* seen container */}
                    <div className=" absolute right-0 flex justify-center items-center">
                        <span className="mr-2 text-slate-700 text-xs">seen</span>
                        <CheckCircle className="w-2" color={"#ffffff"} />
                    </div>

                </div>

                </div>
            </div>
        </div>)
}