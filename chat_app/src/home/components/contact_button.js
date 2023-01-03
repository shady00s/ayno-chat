import { useEffect } from 'react';



export default function ContactButton(props){
    useEffect(()=>{
        
    },[])
    return(
        <div className="flex group items-center p-1 relative
           
           ml-2 mr-2 mb-2 cursor-pointer border-l-2 bg-subBackGround border-l-slate-800
           rounded-sm hover:bg-slate-800  hover:border-l-slate-700">
            <img alt="user profile"src="https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561_960_720.png" className="w-7"/>
            <div className="ml-6 flex flex-col justify-start">   
                <h3 className="font-sans text-slate-100 text-md text-green-50 w-48 truncate ">{props.data.name}</h3>

                <h3 className="font-sans text-grey w-2/3 truncate">Tasdfasdfasdfsadfsdfasdfsdfsadfest</h3>
                
            </div>

            {/* message number component */}
            <div className='flex justify-center items-center flex-col' >
               
                <CounterComponent number="1"/>
                
                <span className=" font-sans text-darkGreen text-xs mt-1">01:00pm </span>

            </div>
            

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