import Sidebar from "../components/side_bar";
import ContactList from "../components/contact_list";
import MessageComponent from "../components/message_component";
import { Helmet } from "react-helmet-async";
import useWindowDimensions from "../../utils/window_size";
export default function HomeScreen(){
    const {width,height} = useWindowDimensions()

   
    return(
        <>
             <main className='mainHomeScreen bg-background  overflow-hidden h-home-screen'>
            
            <Helmet>
                    <title>Ayno Chat - Home</title>
                    <style>{'body { background-color: #1A1E23; }'}</style>
                    <meta name="viewport" content="width=device-width,initial-scale=1"></meta>
                </Helmet>
                <div className="h-22 flex justify-between items-center">
    
                    <img alt="ayno" src={"./images/logo.png"} className=" w-40 p-3"/>
                </div>
    
                <div className="flex flex-wrap items-stretch justify-items-stretch  overflow-hidden h-full">
                    <Sidebar/>
                       {width >= 768 ? <ContactList/> : null} 
                    <MessageComponent />
                </div>
    
            </main>
        </>

       

    );
}