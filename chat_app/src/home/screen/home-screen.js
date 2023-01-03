import { useState,useEffect } from "react";
import Sidebar from "../components/side_bar";
import ContactList from "../components/contact_list";
import MessageComponent from "../components/message_component";
import { Helmet } from "react-helmet-async";
import useWindowDimensions from "../../utils/window_size";
import ContactInformation from "../components/contact_information"
import SettingsComponent from './../components/settings_component';


export default function HomeScreen(){
    const {width,height} = useWindowDimensions()
    const [menuSelected,setMenuSelected] = useState("Contacts")

    const [contactInfoMobile,setContactInfoMobile]=useState(false)
    
 
    return(
        <>
             <main className=' bg-background'>
            
                <Helmet>
                    <title>Ayno Chat - Home</title>
                    <style>{'body { background-color: #1A1E23; }'}</style>
                    <meta name="viewport" content="width=device-width,initial-scale=1"></meta>
                </Helmet>
                <div className="h-22 flex justify-between items-center select-none">
    
                    <img alt="ayno logo" src={"./images/logo.png"} className=" w-40 p-3"/>
                  {
                   width <= 782?
                <div onClick={()=>{setContactInfoMobile(!contactInfoMobile)
                    }} className="flex p-2 items-center cursor-pointer">
                    <h1 className="text-slate-300 mr-2">contact info</h1>
                    <img src={"https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/3.png"} className={'w-8 rounded-full'}/>
                </div>
                 :null}
                </div>
    
                <div className="flex flex-wrap items-stretch justify-items-stretch relative overflow-hidden h-5/6">
                    <Sidebar onClick={(event)=>{
                        setMenuSelected(()=>event.target.id)
                            console.log(event.target.id)
                        }}/>

                        
                       {width >= 768 ?
                            <ContactList isGroup={menuSelected === "Groups"?true:false}/>
                         : null} 

                        {menuSelected === "Settings"? <SettingsComponent/>:null}
                        
                    <MessageComponent />       
                     <ContactInformation  isMobile={ contactInfoMobile}/>
                         
                            
                            
                </div>
    
            </main>
        </>

       

    );
}