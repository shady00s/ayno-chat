import { useState, useMemo,lazy,Suspense } from "react";
const Sidebar = lazy(()=> import( "../components/side_bar"));
const ContactList = lazy(()=>import("../components/friends/user_friends_sidebar")) ;
const SettingsComponent  = lazy(()=> import('../components/settings_component') );
const ContactInformation = lazy(()=> import("../components/friends/contact_information")) 
const AddNewContact = lazy(()=>import("../components/chat_group/add_new_contact")) ;
import { Helmet } from "react-helmet-async";
import useWindowDimensions from "../../utils/window_size";
import ContactContext from '../../context/contactContext';
import NavigationContext from "../../context/navigationContext";
import { logo } from "../../constants";
const CreateChatGroupPopup =lazy(()=>import("../components/chat_group/create_chat_group_popup")) ;
import ChatBodyComponent from "../components/chat/chat_body";
import RemoveFriendAlert from "../components/remove_friend_alert";
import NotificationContext from "../../context/notificationContext"
const ViewImageComponent = lazy(()=>import( "../components/viewImageComponent"));
import LoadingComponent from "../../reusable-components/loading/loading_component";
import FriendContext from "../../context/friendContext";

export default function HomeScreen() {
const { width } = useWindowDimensions()
     //contact
    const [contact, setContact] = useState({})
    const contactValue = useMemo(() => ({ contact, setContact }), [contact])
    // nav
    const [navigation, setNavigation] = useState('Contacts')
    const navigationValue = useMemo(() => ({ navigation, setNavigation }), [navigation])

    // notification 
    const [notifications,setNotifications] = useState({messageNotification:[],groupNotification:[],friendRequestNotification:[]})
    const notificationVal = useMemo(()=>({notifications,setNotifications}),[notifications])
 
//  friend manager 
    const [friend,setFriend]=useState({})
    const friendVal = useMemo(()=>({friend,setFriend}),[friend])
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
                            <div onClick={() => {
                                setNavigation('contact-information')
                            }} className={`${ width <= 770 ?"flex":"hidden"}  p-2 items-center cursor-pointer`}>
                                <h1 className="text-slate-300 mr-2 select-none">{Object.keys(contact).length !== 0 && contact.type=='contact'? contact.name + "'s info" :contact.type=='group'? contact.groupName +" 's info" :"" }</h1>
                               <div className="relative w-8"> 
                               <img src={contact.profileImagePath} className={'w-8 rounded-full'} />
                               </div>
                            </div>
                            
                </div>


                <div className="w-full h-[91vh] relative flex bg-background overflow-hidden">
                   
                    <NavigationContext.Provider value={navigationValue}> 
                         <Suspense fallback={<LoadingComponent/>}>
                                <Sidebar />
                        </Suspense>
                        <Suspense fallback={<LoadingComponent/>}>
                             <SettingsComponent />

                        </Suspense>
                            <ContactContext.Provider value={contactValue}>

                           <NotificationContext.Provider value={notificationVal}>
                            <FriendContext.Provider value={friendVal}>
                                 <ContactList  />

                            </FriendContext.Provider>

                           </NotificationContext.Provider>
                        
                         <ChatBodyComponent/>
                         <Suspense fallback={<LoadingComponent/>}>
                             <ContactInformation />      
                         </Suspense>

                        <Suspense fallback={<LoadingComponent/>}>
                            <AddNewContact/>

                        </Suspense>

                        <Suspense fallback={<LoadingComponent/>}>

                            <RemoveFriendAlert/>
                        </Suspense>
                         </ContactContext.Provider> 

                        <Suspense fallback={<LoadingComponent/>}>

                            <CreateChatGroupPopup/>  
                        </Suspense>
                        <Suspense fallback={<LoadingComponent/>}>
                         <ViewImageComponent/> 

                        </Suspense>
                     </NavigationContext.Provider>
                </div>

            </main>
        </>



    );
}