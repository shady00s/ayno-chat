import { useState, useMemo, useRef,useEffect } from "react";
import Sidebar from "../components/side_bar";
import ContactList from "../components/friends/user_friends_sidebar";
import MessageComponent from "../components/chat/message_component";
import { Helmet } from "react-helmet-async";
import useWindowDimensions from "../../utils/window_size";
import ContactInformation from "../components/friends/contact_information"
import SettingsComponent from '../components/settings_component';
import ContactContext from '../../context/contactContext';
import NavigationContext from "../../context/navigationContext";
import { logo } from "../../constants";
import SocketContext from "../../context/socketContext";
import SocketClientManager from './../../sockets/message_socket';
import { io } from "socket.io-client";



export default function HomeScreen() {
const { width } = useWindowDimensions()


    const [contactInfoMobile, setContactInfoMobile] = useState(false)
    const socket = useRef(SocketClientManager.socketInit())


    const socketSaved = useMemo(()=>(socket.current),[socket.current])

    //contact
    const [contact, setContact] = useState({})
    const contactValue = useMemo(() => ({ contact, setContact }), [contact])
    // nav
    const [navigation, setNavigation] = useState('Contacts')
    const navigationValue = useMemo(() => ({ navigation, setNavigation }), [navigation])



    return (
        <>

            <main className='w-full bg-background overflow-hidden relative h-[95%]  justify-start'>

                <Helmet>
                    <title>Ayno Chat - Home</title>

                    <meta name="viewport" content="width=device-width,initial-scale=1"></meta>
                </Helmet>


                {/* top bar */}

                <div className="flex justify-between items-center select-none">

                    <img alt="ayno logo" src={logo} className=" w-40 p-3" />
                    {
                        width <= 1070 ?
                            <div onClick={() => {
                                setContactInfoMobile(!contactInfoMobile)
                            }} className="flex p-2 items-center cursor-pointer">
                                <h1 className="text-slate-300 mr-2 select-none">{Object.keys(contact).length !== 0 ? contact.name + "'s info" : ""}</h1>
                                <img src={contact.profileImagePath} className={'w-8 rounded-full'} />
                            </div>
                            : null}
                </div>


                <div className="w-full h-[91vh] flex bg-background overflow-hidden">
                    <NavigationContext.Provider value={navigationValue}> 
                         <Sidebar />
                         <SettingsComponent />
                         <SocketContext.Provider value={socketSaved} >

                         <ContactList isMobile={width <= 648 ? true : false} />
                         <MessageComponent/>
                         <ContactInformation isMobile={contactInfoMobile}/>       
                         </SocketContext.Provider>


                        
                     </NavigationContext.Provider>
                </div>

            </main>
        </>



    );
}