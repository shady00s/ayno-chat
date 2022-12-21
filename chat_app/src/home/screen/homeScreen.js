import Sidebar from "../components/side_bar";
import ContactList from "../components/contact_list";
import MessageComponent from "../components/message_component";
import { Helmet } from "react-helmet-async";
export default function HomeScreen(){
    return(

        <div>

            <Helmet>
                <title>My Chat - Home</title>
                <meta name="viewport" content="width=device-width,initial-scale=1"></meta>
            </Helmet>

        <main className='mainHomeScreen bg-background overflow-hidden h-screen'>
            <img alt="ayno logo" src="./logo.png" className=" w-40 p-3"/>

            <div className="flex flex-wrap items-stretch justify-items-stretch  overflow-hidden h-full">
                <Sidebar/>
                    <ContactList/>
                <MessageComponent/>
            </div>

        </main>
        </div>
    );
}