import '../style/side_bar.css'
import IconButtonWithText from './icon_button_with_text'
import { useState } from 'react';
import { User,Users,Sliders,LogOut } from 'react-feather';

const navButtons = [
    
    {name:"Contacts",icon:"user",icon:User},
    {name:"Groups",icon:"users",icon:Users},
    {name:"Settings",icon:"sliders",icon:Sliders},
    {name:"Log-out",icon:"log-out",icon:LogOut},

]
export default function  Sidebar(props){
    const [active,setActive]=useState(0)
   
    return (
        
        <div className="sm:h-home-screen h-mobile-height SidebarComponent">
                {navButtons.map((item,index)=>
                    <div id={item.name} key={item.name} className='pb-4 pr-2 pl-1  z-10'>

                        <IconButtonWithText onClick={(event)=>{
                            
                            props.onClick(event)
                           setActive(index)
                        
                        }}  id={item.name}  isActive={ active === index ? true :false}  key={item.name}  icon={item.icon} name={""}/>
                    </div>
   )}
                
        </div>
    )
}



