import { useEffect,useContext,useState } from 'react';
import NavigationContext from '../../../context/navigationContext';
import ContactContext from '../../../context/contactContext';
import { CounterComponent } from '../../../reusable-components/counter_component';
import SocketContext from './../../../context/socketContext';

export default function ContactButton(props){
    const {setNavigation}= useContext(NavigationContext)
    const {setContact} = useContext(ContactContext)
    const socket = useContext(SocketContext)
    const getUserData =()=>{
        //
        socket.emit("join-conversation",props.data.conversations[0].conversation_Id)
        setNavigation("")
        setContact({...props.data,type:"contact"})
    }
    console.log(props.isActive)
    return(
        <div onClick={()=>{
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
           
                <CounterComponent number="1"/>
                

         
            

        </div>
    )
}

