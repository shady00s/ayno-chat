import { useContext, useEffect,useState } from "react"
import SocketContext from "../../context/socketContext"
import { useDispatch, useSelector } from "react-redux"
import { X ,Bell} from "react-feather"
import { setNewContact } from "../../redux/slice"
import NavigationContext from "../../context/navigationContext"

export default function GroupNotificationComponent(){

    const socket = useContext(SocketContext)
    //const contact = useSelector((state)=>state.data.contact)
    const {setNavigation} = useContext(NavigationContext)
    const [data,setData]=useState("")
    const [show,setShow]=useState(false)
    //const dispatch = useDispatch()
    useEffect(()=>{
        socket.on("notification",(data)=>{
            if(data.type==="friend-request"){           
                    setShow(true)
                    setData(data)
                    setTimeout(()=>{
                        setShow(false)
                    },3000)
                
                
                
            }
            
        })
    },[socket])
    return(

        
        <div className={`${show?"translate-x-0":"translate-x-[-9999px]"} transition-transform duration-150 absolute z-50  md:top-10 md:left-[34%] top-12 left-[10%]  md:p-4 p-8 flex flex-col md:w-auto w-[90%] items-center  justify-center  bg-slate-700 rounded-md`}>
           <div className="flex">
            <Bell className="text-slate-200 w-3 h-4 mr-2" />
            <span className="text-slate-200">{data.name} send a friend request</span>
            <X onClick={()=>{
                setShow(false)
            }} className="stroke-slate-500  w-9 h-9 p-2 cursor-pointer" />
            </div>
            <button className="text-slate-200 bg-slate-600 pl-2 pr-2 p-1 rounded-lg" onClick={()=>{
                setNavigation(()=>({name:"Contacts",target:"friendRequest"}))
                setShow(false)
            }}>
                Go to friend requests
            </button>
        </div>

    )
}