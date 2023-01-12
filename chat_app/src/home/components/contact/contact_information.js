import { useState, useEffect } from 'react';
import useWindowDimensions from '../../../utils/window_size';
import { useContext } from 'react';
import ContactContext from './../../../context/contactContext';


const ContactInformation = (props)=>{
    const [isMobile,setIsMobile] = useState(false)
    const {width} = useWindowDimensions()

    const {contact} = useContext(ContactContext)

    useEffect(()=>{
        setIsMobile(props.isMobile)
        

    },[props.isMobile])


    return(
        <>
            {width <= 868?
            // mobile version
             <div className={ `${isMobile?"opacity-1  visible":"opacity-0  invisible"} overflow-x-hidden     transition-opacity absolute flex justify-end  right-0 bg-theme w-full h-full ease-in duration-300`}>
            {/* main container */}
                <div className= {`${isMobile?"translate-x-0":"translate-x-[999px] "} sm:w-5/12 bg-background  w-5/6  flex flex-col justify-start transition-transform ease-in-out duration-500`}>
                        <img className=' ml-auto mr-auto  rounded-full w-20 mt-10' src={contact.profileImagePath}/>
                        <h1 className='mt-8 text-slate-200 text-xl mb-4  ml-auto mr-auto '>{contact.name}</h1>

                       {/* ID container */}


                       <div className='flex mt-4 w-4/5 ml-auto mr-auto justify-evenly'>
                        <h3 className='text-slate-300'>ID</h3>
                        <span className='text-slate-400'>qe22sdfgd342fgdsf</span>
                       </div>

                       <div className='bg-slate-900 mt-10 mr-auto ml-auto w-10/12 h-[0.1rem]'></div>

                       {/* Media container */}
                       <h2 className='text-slate-200 text-md ml-4 mt-6 mb-4'>Media</h2>

                        <div className='w-11/12 h-48 overflow-y-scroll pl-3 pr-3 ml-4  flex-wrap flex gap-2'>
                            <img className='w-12 h-12' src={"https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/4.png"}/>
                            <img className='w-12 h-12' src={"https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/4.png"}/>
                            <img className='w-12 h-12' src={"https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/4.png"}/>
                            <img className='w-12 h-12' src={"https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/4.png"}/>
                            <img className='w-12 h-12' src={"https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/4.png"}/>
                            <img className='w-12 h-12' src={"https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/4.png"}/>
                            <img className='w-12 h-12' src={"https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/4.png"}/>
                            <img className='w-12 h-12' src={"https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/4.png"}/>
                            <img className='w-12 h-12' src={"https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/4.png"}/>
                        
                            <img className='w-12 h-12' src={"https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/4.png"}/>
                            <img className='w-12 h-12' src={"https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/4.png"}/>
                            <img className='w-12 h-12' src={"https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/4.png"}/>
                            <img className='w-12 h-12' src={"https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/4.png"}/>
                        
                            <img className='w-12 h-12' src={"https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/4.png"}/>
                            <img className='w-12 h-12' src={"https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/4.png"}/>
                        
                        
                            <img className='w-12 h-12' src={"https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/4.png"}/>
                            <img className='w-12 h-12' src={"https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/4.png"}/>
                        
                        
                        
                        </div>

                    </div>
             </div>
             // desktop version
             :  <div className='w-2/6'>
                     <div className= {` bg-background w-full h-full flex flex-col justify-start transition-transform ease-in-out duration-500`}>
                        <img className=' ml-auto mr-auto  rounded-full w-20 mt-10' src={contact.profileImagePath}/>
                        <h1 className='mt-8 text-slate-200 text-xl mb-4  ml-auto mr-auto '>{contact.name}</h1>

                       {/* ID container */}


                       <div className='flex mt-4 w-4/5 ml-auto mr-auto justify-evenly'>
                        <h3 className='text-slate-300'>ID</h3>
                        <span className='text-slate-400'>{contact._id}</span>
                       </div>

                       <div className='bg-slate-900 mt-10 mr-auto ml-auto w-10/12 h-[0.1rem]'></div>

                       {/* Media container */}
                       <h2 className='text-slate-200 text-md ml-4 mt-6 mb-4'>Media</h2>

                        <div className='w-8/12 h-48 overflow-y-scroll pl-3 pr-3 ml-12  flex-wrap flex gap-2'>
                            <img className='w-12 h-12' src={"https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/4.png"}/>
                            <img className='w-12 h-12' src={"https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/4.png"}/>
                            <img className='w-12 h-12' src={"https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/4.png"}/>
                            <img className='w-12 h-12' src={"https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/4.png"}/>
                            <img className='w-12 h-12' src={"https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/4.png"}/>
                            <img className='w-12 h-12' src={"https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/4.png"}/>
                            <img className='w-12 h-12' src={"https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/4.png"}/>
                            <img className='w-12 h-12' src={"https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/4.png"}/>
                            <img className='w-12 h-12' src={"https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/4.png"}/>
                        
                            <img className='w-12 h-12' src={"https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/4.png"}/>
                            <img className='w-12 h-12' src={"https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/4.png"}/>
                            <img className='w-12 h-12' src={"https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/4.png"}/>
                            <img className='w-12 h-12' src={"https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/4.png"}/>
                        
                            <img className='w-12 h-12' src={"https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/4.png"}/>
                            <img className='w-12 h-12' src={"https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/4.png"}/>
                        
                        
                            <img className='w-12 h-12' src={"https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/4.png"}/>
                            <img className='w-12 h-12' src={"https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/4.png"}/>
                        
                        
                        
                        </div>

                    </div>
                </div>
                
                }
        </>
    )
}

export default ContactInformation