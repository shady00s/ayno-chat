import { useContext, useEffect,useState } from "react"
import SocketContext from "../../context/socketContext"
import { useDispatch, useSelector } from "react-redux"
import { X ,Bell} from "react-feather"
import { setNewContact } from "../../redux/slice"

export default function UserNotificationComponent(){

    const socket = useContext(SocketContext)
    const contact = useSelector((state)=>state.data.contact)
    const [contactData,setContactData]=useState("")
    const [show,setShow]=useState(false)
    const dispatch = useDispatch()
    useEffect(()=>{
        socket.on("notification",(data)=>{
            if(data.type==="message"){
              
                if(contact._id === null || contact._id!==data.user){
                    setShow(true)
                    setContactData(data)
                    setTimeout(()=>{
                        setShow(false)
                    },3000)
                }else{
                    setShow(false)  
                }
                
  
            }
            
        })
    },[socket,contact])
    return(

        
        <div className={`${show?"translate-x-0":"translate-x-[-9999px]"} transition-transform duration-100 absolute z-50  md:top-10 md:left-[34%] top-12 left-[10%]  md:p-4 p-8 flex flex-col md:w-auto w-[90%] items-center  justify-center  bg-slate-700 rounded-md`}>
           <div className="flex">
            <Bell className="text-slate-200 w-3 h-4 mr-2" />
            <span className="text-slate-200">You have new message from {contactData.name}</span>
            <X onClick={()=>{
                setShow(false)
            }} className="stroke-slate-500  w-9 h-9 p-2 cursor-pointer" />
            </div>
            <button className="text-slate-200 bg-slate-600 pl-2 pr-2 p-1 rounded-lg" onClick={()=>{
                dispatch(setNewContact({
                    _id:contactData.user,
                    conversations:[{conversation_Id:contactData.conversation_id,contact_Id:contactData.user}],
                    name:contactData.name,
                    profileImagePath:contactData.profileImagePath,
                    type:"contact"
                    
                }))
                setShow(false)
            }}>
                Go to conversation
            </button>
        </div>

    )
}