import { useState, useMemo } from "react";
import Sidebar from "../components/side_bar";
import ContactList from "../components/contact/contact_list";
import MessageComponent from "../components/chat/message_component";
import { Helmet } from "react-helmet-async";
import useWindowDimensions from "../../utils/window_size";
import ContactInformation from "../components/contact/contact_information"
import SettingsComponent from './../components/settings_component';
import ContactContext from './../../context/contactContext';


export default function HomeScreen() {
    const { width } = useWindowDimensions()

    const [contactInfoMobile, setContactInfoMobile] = useState(false)
    const [conversation_data,setConversationData] = useState({})

    const [contact,setContact] = useState({})

    const contactValue = useMemo(()=>({contact,setContact}),[contact])
    console.log(contact)

    return (
        <>

            <main className='w-full bg-background overflow-hidden  relative  h-screen justify-start'>

                <Helmet>
                    <title>Ayno Chat - Home</title>

                    <meta name="viewport" content="width=device-width,initial-scale=1"></meta>
                </Helmet>


                {/* top bar */}

                <div className="flex justify-between items-center select-none">

                    <img alt="ayno logo" src={"./images/logo.png"} className=" w-40 p-3" />
                    {
                        width <= 1070 ?
                            <div onClick={() => {
                                setContactInfoMobile(!contactInfoMobile)
                            }} className="flex p-2 items-center cursor-pointer">
                                <h1 className="text-slate-300 mr-2">{"contact.name"}'s info</h1>
                                <img src={""} className={'w-8 rounded-full'} />
                            </div>
                            : null}
                </div>

                <div className="flex h-[90%] w-full ">

                    <Sidebar />
                    <ContactContext.Provider value={contactValue}>
                    <ContactList isMobile={width <= 648 ? true : false}  onSelectContact={(data)=>{setConversationData(data)}}/>
                    <MessageComponent />
                    <ContactInformation isMobile={contactInfoMobile} />

                    </ContactContext.Provider>
                    
                    <SettingsComponent />

                </div>


            </main>
        </>



    );
}