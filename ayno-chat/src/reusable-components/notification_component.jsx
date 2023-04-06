import { useContext, useEffect,useState } from "react"
import SocketContext from "../context/socketContext"
import { useSelector } from "react-redux"
import { X ,Bell} from "react-feather"

export default function NotificationComponent(){

    const socket = useContext(SocketContext)
    const contact = useSelector((state)=>state.data.contact)
    const [name,setName]=useState("")
    const [show,setShow]=useState(false)
    useEffect(()=>{
        socket.on("notification",(data)=>{
            switch(data.type){
                case "message":
                if(contact._id === null || contact._id !== data.user){
                    setShow(true)
                    setName(data.name)
                    setTimeout(()=>{
                        setShow(false)
                    },3000)
                }else{
                    setShow(false)  
                }
                
                break 
                case "group-message":
                    

                    
                    break
                    default:
                        break
            }
            
        })
    },[socket])
    return(

        
        <div className={`${show?"translate-x-0":"translate-x-[-9999px]"} transition-transform duration-100 absolute z-50  md:top-10 md:left-[34%] top-12 left-[10%] h-10 p-4 flex  items-center  justify-center  bg-slate-700 rounded-md`}>
           <Bell className="text-slate-200 w-3 h-4 mr-2" />
            <span className="text-slate-200">You have new message from {name}</span>
            <X onClick={()=>{
                setShow(false)
            }} className="stroke-slate-500  w-9 h-9 p-2 cursor-pointer" />
        </div>

    )
}