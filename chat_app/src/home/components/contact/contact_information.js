import { useState, useEffect } from 'react';

import { UserX ,UserMinus } from 'react-feather';
import useWindowDimensions from '../../../utils/window_size';

const ContactInformation = (props)=>{
    const [isMobile,setIsMobile] = useState(false)
    const {width,height} = useWindowDimensions()
    useEffect(()=>{
        setIsMobile(props.isMobile)
        

    },[props.isMobile,width])

    const mobileConfigurationStyle ="absolute bg-theme w-full h-full transition-colors  z-50  top-0 left-0 overflow-y-auto"
    const mobileInfoContainerStyle = "w-0 h-0 -translate-x-full transition-transform invisible"
    return(
        <>
        <div id='main' onClick={(event)=>{
            if(event.target.id ==="main"){
                setIsMobile(false)
            }
            return
            }} className={isMobile? mobileConfigurationStyle :"w-[23rem] pl-4 pr-4  transition-colors"}>

        
        <div  className={ width <=782? ` flex flex-col items-center justify-start transition-all  ${isMobile?"absolute top-0 w-4/5 md:w-2/5  bg-background right-0 h-full translate-x-0" :mobileInfoContainerStyle} `:"w-full visible h-full"}>

            <div className={`flex flex-col justify-start items-center p-4 border-b-2 border-b-slate-800 w-full `}>
                <img  src={"https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/3.png"} className={"w-20 rounded-full"}/>
                    <h1 className="text-slate-200 m-4 text-xl">test name</h1>
                    <div className='flex justify-between w-full'>
                        <h4 className='text-slate-400'>ID</h4>
                        <span className='text-slate-200'>12121212122</span>
                    </div>
                    <span className="text-slate-600">121212 total messages</span>
                
            </div>

            {/* media container */}
            <div className=" w-66 m-auto">
                <h2 className="text-md text-white p-3">Media </h2>

                <div className="flex w-full relative left-3.5 flex-wrap p-1 h-4/5 overflow-y-auto">

                <img  src={"https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/3.png"} className={"w-16 rounded-sm m-1"}/>
                <img  src={"https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/3.png"} className={"w-16 rounded-sm m-1"}/>
                <img  src={"https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/3.png"} className={"w-16 rounded-sm m-1"}/>
                <img  src={"https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/3.png"} className={"w-16 rounded-sm m-1"}/>
                <img  src={"https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/3.png"} className={"w-16 rounded-sm m-1"}/>
                <img  src={"https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/3.png"} className={"w-16 rounded-sm m-1"}/>
                <img  src={"https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/3.png"} className={"w-16 rounded-sm m-1"}/>
                <img  src={"https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/3.png"} className={"w-16 rounded-sm m-1"}/>
                <img  src={"https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/3.png"} className={"w-16 rounded-sm m-1"}/>
                </div>
                
            </div>
            {/* contact options */}

            <div className="flex w-full justify-evenly mt-10 flex-wrap">
                <button className=" p-2  text-orange-500 border-2 rounded-md border-slate-800 flex justify-center items-center"><UserMinus className='pl-1 pr-1'/> Unfriend</button>
                <button className="p-2 text-red-600 border-2 rounded-md border-slate-800 flex justify-center items-center"><UserX className='pl-1 pr-1'/> Block </button>
            </div>
        </div>
        </div> 
        </>
    )
}

export default ContactInformation