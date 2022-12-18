import ContactButton from "./contact_button"
import EmptyContactComponent from "./empty_contacts_component";
import SearchComponent from "./search_component";
import { useEffect, useState } from 'react';
import ApiCall from './../api_call';
export default function ContactList(){




    const [contacts,setContacts] = useState([])

    const [search,setSearch] = useState('')

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
        ApiCall.getFriendsList("639dee4c23a8fd4dce882024").then(value=>{
            setContacts(()=>value.data.body.friends)
        })      
    },[])


    return(
        <div style={{borderRight:" 3px solid rgba(60, 67, 60, 0.167)",height:"88%"}} className="hidden  xl:block flex-col pl-4  pb-14 pt-4 justify-center items-center overflow-y-auto max-w-md">
            <SearchComponent searchSubmit={getSearchResult} searchResult={(value)=>{setSearch(value.target.value)}}/>
            {contacts.length ===0? <EmptyContactComponent/>:contacts.map(contact=>{
                <ContactButton/>
            })}

        </div>
    )
}