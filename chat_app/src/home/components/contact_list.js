import ContactButton from "./contact_button"
import EmptyContactComponent from "./empty_contacts_component";
import StorageManager from "../../utils/storage_manager";
import SearchComponent from "./search_component";
import { useEffect, useState } from 'react';
import ApiCall from './../api_call';
import LoadingComponent from './../../reusable-components/loading_component';
import NewFirendComponent from "./new_friend_component";
import { X } from "react-feather";

export default function ContactList(props){

    const [searchContainer,setSearchContainer] = useState(false)


    const [contacts,setContacts] = useState([])

    const [search,setSearch] = useState('')

    const [loading,setLoading] = useState(false)
    const [searchList,setSearchList] = useState([])

    const getSearchResult = ()=>{


        // ApiCall.getSearchData(search).then(value=>{
        //     if(value.status === 200){
        //         setSearchList((oldData)=>[...oldData,value.data.body])
                
        //     }
        //     else if(value.status === 204){
        //         alert('There is no user with name ' +search)
        //     }
        // })
    }


    useEffect(()=>{
        console.log("contact component called")

        // let userData = StorageManager.getDataFromStorage()
     
        // setLoading(true)
        // if(userData !== {}){
          
        //     ApiCall.getFriendsList(userData.id).then(value=>{
        //         setLoading(false)
                
        //         setContacts(()=>value.data.body.friends)
                
        //     })  
        // }
        //     console.log(searchList)
        
    },[])

 
    return(
        <div style={{borderRight:"3px solid rgba(60, 67, 60, 0.167)"}} className="flex flex-col h-home-screen  w-3/12 overflow-y-auto ">
            <SearchComponent title={props.isGroup?"Search for groups":"Search for friends"}  onInputClick={()=>{setSearchContainer(true)}} searchSubmit={getSearchResult} searchResult={(value)=>{setSearch(value.target.value)}}/>
                {/* search result */}
            { searchContainer?
                    <div style={{backgroundColor:"rgba(30, 41, 59,0.2)"}} className="max-h-3/4   overflow-y-auto rounded-sm p-2 ml-1 mr-1 -mt-1 mb-3  ">
                            <div className="flex justify-between">
                                <h6 className="text-slate-200 text-left p-1 mb-5 ">Search results</h6>

                                <span className="p-1 flex justify-center items-center h-7 cursor-pointer select-none rounded-md transition-colors text-slate-400 hover:bg-slate-600" onClick={()=>{setSearchContainer(false)}}><X/> Close</span>
                            </div>
                        {searchList.length !== 0 ? searchList.map(data=><NewFirendComponent data={data}/>) : <div></div>}
                        
                        
                    </div> :null
               } 
             
                
               <div className="p-1 ">

               <h6 className="text-slate-200 text-left p-1">{props.isGroup?"Groups":"Friends"}</h6>
               {loading?<LoadingComponent/>: contacts.length === 0 ?<EmptyContactComponent/>:contacts.map((data)=>{<ContactButton data={data}/>})}
            
               </div>

        </div>
    )
}