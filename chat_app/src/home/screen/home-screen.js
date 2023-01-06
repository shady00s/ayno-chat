import { useState } from "react";
import Sidebar from "../components/side_bar";
import ContactList from "../components/contact/contact_list";
import MessageComponent from "../components/chat/message_component";
import { Helmet } from "react-helmet-async";
import useWindowDimensions from "../../utils/window_size";
import ContactInformation from "../components/contact/contact_information"
import SettingsComponent from './../components/settings_component';


export default function HomeScreen(){
    const {width,height} = useWindowDimensions()
    const [menuSelected,setMenuSelected] = useState("Contacts")

    const [contactInfoMobile,setContactInfoMobile]=useState(false)
    
 
    return(
        <>
             <main className='w-full bg-background h-screen overflow-x-hidden relative flex flex-col'>
            
                <Helmet>
                    <title>Ayno Chat - Home</title>
                    <style>{'body { background-color: #101516; }'}</style>

                    <meta name="viewport" content="width=device-width,initial-scale=1"></meta>
                </Helmet>
                {/* top bar */}
                <div className="h-12 flex justify-between items-center select-none">
    
                    <img alt="ayno logo" src={"./images/logo.png"} className=" w-40 p-3"/>
                  {
                   width <= 1070?
                <div onClick={()=>{setContactInfoMobile(!contactInfoMobile)
                    }} className="flex p-2 items-center cursor-pointer">
                    <h1 className="text-slate-300 mr-2">contact info</h1>
                    <img src={"https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/3.png"} className={'w-8 rounded-full'}/>
                </div>
                 :null}
                </div>
                    
                <section className="flex w-full h-full items-stretch justify-start bg-background  overflow-y-scroll">
                    <Sidebar onClick={(event)=>{
                        setMenuSelected(()=>event.target.id)
                            console.log(event.target.id)
                        }}/>

                            <ContactList isOpened={menuSelected === "Contacts"? true:false} isMobile={width >= 648 ? true:false}/>

                        {menuSelected === "Settings"? <SettingsComponent/>:null}
                        
                    <MessageComponent />       
                     <ContactInformation  isMobile={ contactInfoMobile}/>
                         
                            
                            
                </section>
    
            </main>
        </>

       

    );
}