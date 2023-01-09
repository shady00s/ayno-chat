import { useEffect,useContext } from 'react';
import NavigationContext from './../../../context/navigationContext';
import ContactContext from './../../../context/contactContext';


export default function ContactButton(props){
    const {setComponent}= useContext(NavigationContext)
    const   {setContact} = useContext(ContactContext)
    const getUserData =()=>{
        setComponent("")
        setContact(props.data)
    }

    return(
        <div onClick={()=>{getUserData()}} className="p-2 flex group items-center justify-evenly  w-full transition-colors  mb-2 cursor-pointer border-l-2 bg-subBackGround border-l-slate-800
           rounded-sm hover:bg-slate-800  hover:border-l-slate-700">
           
            <img alt="user profile"src={props.data.profileImagePath} className="w-7 rounded-full "/>
            <div className="ml-3 pr-1 w-8/12 flex flex-col justify-start ">   
                <h3 className="font-sans text-slate-100 text-md   truncate ">{props.data.name}</h3>

                
            </div>
            
           

            {/* message number component */}
           
                <CounterComponent number="1"/>
                

         
            

        </div>
    )
}


export function CounterComponent(props){
let number = parseInt(props.number) > 99 ? "99+": props.number
    return (
        <div className="bg-sky-900 w-[1.3rem] h-[1.3rem] rounded-full flex justify-center  animate-pulse">
         <span  className="text-[9px] text-center m-auto text-white">{number}</span>
        </div>
    )
}