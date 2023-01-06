import { useState, useMemo } from "react";
import Sidebar from "../components/side_bar";
import ContactList from "../components/contact/contact_list";
import MessageComponent from "../components/chat/message_component";
import { Helmet } from "react-helmet-async";
import useWindowDimensions from "../../utils/window_size";
import ContactInformation from "../components/contact/contact_information"
import SettingsComponent from './../components/settings_component';

import NavigationContext from "../../context/navigationContext";
import ContactContext from "../../context/contactContext";

export default function HomeScreen() {
    const { width, height } = useWindowDimensions()

    const [contactInfoMobile, setContactInfoMobile] = useState(false)

    const [component, setComponent] = useState("");
    const [contact, setContact] = useState({});

    const navigationValue = useMemo(() => ({ component, setComponent }), [component, setComponent]);
    const contactValue = useMemo(() => ({ contact, setContact }), [contact, setContact]);


    return (
        <>
            <NavigationContext.Provider value={navigationValue}>
                <main className='w-full bg-background overflow-x-hidden  relative  h-screen justify-start'>

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
                                    <h1 className="text-slate-300 mr-2">{contact.name}'s info</h1>
                                    <img src={contact.profilePath} className={'w-8 rounded-full'} />
                                </div>
                                : null}
                    </div>

                    <div className="flex h-[90%] w-full ">
                        <Sidebar />

                        <SettingsComponent />

                        <ContactContext.Provider value={contactValue}>

                            <ContactList isMobile={width <= 648 ? true : false} />
                            <MessageComponent />
                            {Object.keys(contact).length !== 0 ? <ContactInformation isMobile={contactInfoMobile} /> : null}

                        </ContactContext.Provider>
                    </div>


                </main>
            </NavigationContext.Provider>
        </>



    );
}