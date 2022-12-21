import ContactButton from "./contact_button"
import EmptyContactComponent from "./empty_contacts_component";
import StorageManager from "../../utils/storage_manager";
import SearchComponent from "./search_component";
import { useEffect, useState } from 'react';
import ApiCall from './../api_call';
import LoadingComponent from './../../reusable-components/loading_component';
export default function ContactList(){




    const [contacts,setContacts] = useState([])

    const [search,setSearch] = useState('')

    const [loading,setLoading] = useState(false)
    const [searchList,setSearchList] = useState([])

    const getSearchResult = ()=>{
        ApiCall.getSearchData(search).then(value=>{
            if(value.status === 200){
                console.log(value.data.body)
            }
            else if(value.status === 204){
                alert('There is no user with name ' +search)
            }
        })
    }


    useEffect(()=>{
        let userData = StorageManager.getDataFromStorage()
        setLoading(true)
        if(userData !== {}){
            ApiCall.getFriendsList(userData.id).then(value=>{
                setLoading(false)
                
                setContacts(()=>value.data.body.friends)
                
            })  
        }
            
        
    },[])

 
    return(
        <div style={{borderRight:" 3px solid rgba(60, 67, 60, 0.167)"}} className="hidden  xl:block flex-col pl-4  pb-14 pt-4 justify-center items-center overflow-y-auto w-1/4">
            <SearchComponent searchSubmit={getSearchResult} searchResult={(value)=>{setSearch(value.target.value)}}/>

             <div className="m-auto relative top-1/4 w-2/3">{loading?<LoadingComponent title={"loading contacts...."}/>:  contacts.length === 0 ? <EmptyContactComponent/> : contacts.map((contactsData)=> <ContactButton contacts={contactsData}/> )}</div>
        </div>
    )
}