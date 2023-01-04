import { useState } from 'react';
import { User,Users,Sliders,LogOut } from 'react-feather';
import IconButton from './icons_button';
const navButtons = [
    
    {name:"Contacts",icon:"user",icon:User},
    {name:"Groups",icon:"users",icon:Users},
    {name:"Settings",icon:"sliders",icon:Sliders},
    {name:"Log-out",icon:"log-out",icon:LogOut},

]
export default function  Sidebar(props){
    const [active,setActive]=useState(0)
   
    function logoutComponent(){
        const logOutPopup = window.confirm("Are you sure uou want to log-out")
        if(logOutPopup) StorageManager.removeUserData()

        return

    }
    return (
        
        <div className="border-r-2 border-r-slate-800 bg-[rgba(175,214,242,0.008)]">
                {navButtons.map((item,index)=>
                    <div id={item.name} key={item.name} className='pb-4 pr-2 pl-1  z-10'>

                        <IconButton onClick={(event)=>{
                            
                            props.onClick(event)
                           setActive(index)
                           if(active === 3)logoutComponent()
                        
                        }}  id={item.name}  isActive={ active === index ? true :false}  key={item.name}  icon={item.icon} name={""}/>
                    </div>
   )}
                
        </div>
    )
}



