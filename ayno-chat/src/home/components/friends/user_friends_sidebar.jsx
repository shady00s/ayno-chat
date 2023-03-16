import SearchComponent from "../search/search_component";
import React,{ useEffect, useState, useContext } from 'react';
import ApiCall from '../../../api_call';
import NewFirendComponent from "../search/search_result_component";
import { X } from "react-feather";
import NavigationContext from '../../../context/navigationContext';

import { FriendRequestComponent } from '../friend_request/friend_request_component';
import FriendsList from "./friends_list";
import ChatGroupComponent from './../chat_group/chat_group_screen';

import NotificationContext from "../../../context/notificationContext";
import useWindowDimensions from './../../../utils/window_size';
import SocketContext from "../../../context/socketContext";


 function ContactList(){

    const {width} = useWindowDimensions()
    const [isMobile,setIsMobile] = useState(false)
    const [searchContainer,setSearchContainer] = useState(false)
    const [search,setSearch] = useState('')
    const [searchList,setSearchList] = useState([])
    const socket = useContext(SocketContext)

        const {notifications,setNotifications} = useContext(NotificationContext)
    useEffect(()=>{
        socket.on('message-notification',(data)=>{
            switch (data.type) {
                case "message":
                    
                    //setNotifications(()=>({...notifications,notifications.messageNotification:[]}))
            
                default:
                    return;
            }
        })
    },[])
   console.log(notifications); 
    useEffect(()=>{
        width > 770 ? setIsMobile(false):setIsMobile(true)

    },[width])

    const {navigation} = useContext(NavigationContext)

    const getSearchResult = ()=>{


        ApiCall.getSearchData(search.toLowerCase()).then(value=>{
            if(value.status === 200){
                let isExisted = searchList.some(oldData=>oldData.id === value.data.body.id)
                if(!isExisted){
                    setSearchList((oldData)=>[...oldData,value.data.body])

                }
                console.log(value.data.body);
            }
            else if(value.status === 204){
                alert('There is no user with name ' +search)
            }
        })
    }



    return(
        // desktop version
        <>{isMobile === false ?
            <div style={{borderRight:"3px solid rgba(60, 67, 60, 0.167)"}} className="flex flex-col md:w-4/12 w-3/12  overflow-x-hidden bg-background transition-transform ease-in-out duration-500">
        <SearchComponent title={"Search for friends"}  onInputClick={()=>{setSearchContainer(true)}} searchSubmit={getSearchResult} searchResult={(value)=>{setSearch(value.target.value)}}/>
            {/* search result */}

            <div className="overflow-y-auto  h-full ">
            { searchContainer?
                <div style={{backgroundColor:"rgba(30, 41, 59,0.2)"}} className=" overflow-y-auto rounded-sm p-2 ml-1 mr-1 -mt-1 mb-3  ">
                        <div className="flex justify-between">
                            <h6 className="text-slate-200 text-left p-1 mb-5 ">Search results</h6>

                            <span className="p-1 flex justify-center items-center h-7 cursor-pointer select-none rounded-md transition-colors text-slate-400 hover:bg-slate-600" onClick={()=>{setSearchContainer(false)}}><X/> Close</span>
                        </div>
                    {searchList.length !== 0 ? searchList.map(data=><NewFirendComponent key={data} data={data}/>) : <div></div>}
                    
                    
                </div> :null
            } 
            
            {/* firend request */}

            <FriendRequestComponent/>
            {/* friend list */}
           <FriendsList/>
            {/* Group list */}
            <ChatGroupComponent/>
            </div>
     

    </div>
//    mobile version

    :<div className={ `${navigation==="Contacts"?"opacity-1 translate-x-0" :"opacity-0 translate-x-[-999px]"}  transition-opacity ease-in duration-500 left-10 absolute overflow-x-hidden w-[95%] h-[90%] bg-theme z-50`}>
        <div style={{borderRight:"3px solid rgba(60, 67, 60, 0.167)"}} className={`${navigation==="Contacts"? "translate-x-0" :"translate-x-[-999px]"} transition-transform   ease-in-out duration-300 flex flex-col h-full overflow-y-auto bg-background z-50 xl:w-7/12 w-7/12`}>
        <SearchComponent title={"Search for friends"}  onInputClick={()=>{setSearchContainer(true)}} searchSubmit={getSearchResult} searchResult={(value)=>{setSearch(value.target.value)}}/>
            {/* search result */}
       
       
            <div className="overflow-y-auto  h-full ">
                
        { searchContainer?
                <div style={{backgroundColor:"rgba(30, 41, 59,0.2)"}} className="max-h-3/4   overflow-y-auto rounded-sm p-2 ml-1 mr-1 -mt-1 mb-3  ">
                        <div className="flex justify-between">
                            <h6 className="text-slate-200 text-left p-1 mb-5 ">Search results</h6>

                            <span className="p-1 flex justify-center items-center h-7 cursor-pointer select-none rounded-md transition-colors text-slate-400 hover:bg-slate-600" onClick={()=>{setSearchContainer(false)}}><X/> Close</span>
                        </div>
                    {searchList.length !== 0 ? searchList.map(data=><NewFirendComponent  data={data}/>) : <div></div>}
                    
                    
                </div> :null
            } 
            {/* firend request */}

            <FriendRequestComponent/>
             {/* friend list */}

           <FriendsList/>

           {/* Group list */}
           <ChatGroupComponent/>
           </div>
    </div>
    </div>
    
    }
</>
       
    )
}

export default React.memo(ContactList)