import { useState, useEffect } from 'react';
import { User,Sliders,LogOut } from 'react-feather';
import IconButton from './icons_button';
import NavigationContext from '../../context/navigationContext';
import { useContext } from 'react';
import ApiCall from './../../api_call';
import { useNavigate } from 'react-router-dom';


const navButtons = [
    
    {name:"Contacts",icon:User},
   
    {name:"Settings",icon:Sliders},
    {name:"Log-out",icon:LogOut},

]



export default function  Sidebar(props){
    const {navigation,setNavigation} = useContext(NavigationContext)
    const nav = useNavigate()
    const [active,setActive]=useState(0)
    

    function logoutComponent(){
        const logOutPopup = window.confirm("Are you sure uou want to log-out")
        if(logOutPopup){
            ApiCall.logOut().then(val=>{
                if(val.status === 201){
                    nav('/')
                }
            })
        }

        return
        

    }
    return (
        
        <div className=" z-50 border-r-2 border-r-slate-800 bg-[rgba(175,214,242,0.008)]">
                {navButtons.map((item,index)=>
                  
                    <div  key={item.name} onClick={()=>{

                        
                            setActive(()=>index)
                            setNavigation(()=>item.name)                        
                        
                       
                       if(index === 2){
                        logoutComponent()
                       }
                       
                        
                        }} className='pb-4 pr-2 pl-1  z-10'>

                        <IconButton key={item.name} onClick={()=>{}}  isActive={ active === index ? true :false}   icon={item.icon} name={""}/>
                    </div>
              
                    
   )}
                
        </div>
    )
}



