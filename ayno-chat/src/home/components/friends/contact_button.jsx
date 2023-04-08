import { useEffect,useContext,useState } from 'react';
import NavigationContext from '../../../context/navigationContext';
import { CounterComponent } from '../../../reusable-components/counter_component';
import SocketContext from './../../../context/socketContext';
import { useSelector,useDispatch } from 'react-redux';
import {setNotifications} from "../../../redux/slice"
import { setNewContact } from '../../../redux/slice';
export default function ContactButton(props){
    const {setNavigation}= useContext(NavigationContext)
    const setContact = useDispatch()
    const socket = useContext(SocketContext)
    const [number,setNumber] = useState(0)
    const notifications = useSelector((state)=>state.data.notifications)
    const contact = useSelector((state)=>state.data.contact)
    const user = useSelector((state)=>state.data.user)
    const setNotification = useDispatch()
    const getUserData =()=>{
        const conversation = props.data.conversations.find((data)=>data.contact_Id === user.id)
        socket.emit("join-conversation",conversation.conversation_Id)
        setNavigation("")
        setContact(setNewContact({   
            name:props.data.name,
            _id:props.data._id,
            profileImagePath:props.data.profileImagePath
            ,conversations:[{conversation_Id:conversation.conversation_Id}]
            ,type:"contact"}))
    }
    useEffect(()=>{

        for (let index = 0; index < notifications.messageNotifications.length; index++) {

            if(props.data._id === notifications.messageNotifications[index].user){
                setNumber(notifications.messageNotifications[index].newMessage)
            }
            
        }
        
    },[notifications])
    return(
        <div onClick={()=>{ 
            let resetObject = {...notifications}

            for (let index = 0; index < notifications.messageNotifications.length; index++) {
                if(props.data._id === notifications.messageNotifications[index].user || contact._id){
                    resetObject.messageNotifications[index].newMessage = 0
                }
                
            }
            setNotification(setNotifications(resetObject))
            getUserData()
            props.onClick()
        }}  className={`${props.selected?"bg-[rgba(124,154,230,0.2)]":"bg-subBackGround"} p-2 flex group items-center justify-evenly  w-full transition-colors  mb-2 cursor-pointer border-l-2  border-l-slate-800
           rounded-sm hover:bg-slate-800  hover:border-l-slate-700`}>
           <div className='relative w-8'>
            <img alt="user profile"src={props.data.profileImagePath} className="w-8 rounded-full "/>
            <div className={`${props.isActive?" scale-100":"scale-0"} transition-transform duration-100 ease-in absolute bottom-0 rounded-full  right-0 w-2 h-2 bg-emerald-500`}></div>
           </div>
            <div className="ml-3 pr-1 w-8/12 flex flex-col justify-start ">   
                <h3 className="font-sans text-slate-100 text-md   truncate ">{props.data.name}</h3>

                
            </div>
            
           

            {/* message number component */}
           
                <CounterComponent number={number}/>
                

         
            

        </div>
    )
}

