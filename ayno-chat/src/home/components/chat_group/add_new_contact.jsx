import { useContext, useCallback, useState, useEffect } from "react";
import ApiCall from "../../../api_call";
import NavigationContext from "../../../context/navigationContext";
import { X } from "react-feather";
import SubmitButton from '../../../registration/components/submit_button'
import InputErrorComponent from '../../../registration/components/input_error_component'
import { FriendListSkeleton } from '../../../reusable-components/skeleton/friend_list'
import { useSelector } from 'react-redux';
export default function AddNewContact() {
    const  contact = useSelector((state)=>state.data.contact)
    const { navigation, setNavigation } = useContext(NavigationContext)
    
    const [newFriends, setNewFriends] = useState([])
    const [selectedFriends, setSelectedFriends] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    

   

    useEffect(() => {
       // newContacts()
       if(navigation.conversation_id !== undefined){
        setLoading(true)

           ApiCall.getNewFriendsToGroup(navigation.conversation_id).then(val=>{
            setNewFriends(()=>val.data.filteredFriends)
            setLoading(false)
           }).catch(err=>{
                alert("error occurred")
                setLoading(false)
           })

       }
    }, [navigation])
 
    return (<div className={`${navigation.name === "add-contact-group" ? "translate-x-0 flex justify-center items-center opacity-100" : "translate-x-[9999px] opacity-0"} transition-opacity duration-100 ease-out absolute z-30 w-full h-full bg-theme`}>
        <div className="md:w-[30%] w-4/5 bg-slate-800  rounded-md  overflow-hidden">
            {/* title and close container */}
            <div className="flex justify-between items-center m-auto p-1 mt-3 w-[90%]">
                <span className="text-slate-300">Add new contact to group</span>
                <div className="flex cursor-pointer hover:bg-gray-700 p-1 rounded-md items-center
                    " onClick={() => {
                        setNavigation("")
                    }

                    }>
                    <X className="stroke-slate-300" />
                    <span className="text-sm text-gray-400 ">close</span>

                </div>
            </div>

            {/* friends container */}
            <div className="flex flex-col w-full p-1">
                {/* selected friends */}
                <div className="flex flex-wrap items-start p-1">
                    {selectedFriends.length !== 0 ? selectedFriends.map(data =>
                        <div className="flex items-center p-1 rounded-xl m-1 opacity-100 duration-100 bg-gray-600"><span className="text-sm">{data.name}</span> <X onClick={() => {
                            const editedArray = selectedFriends.filter(selectedData => selectedData._id !== data._id)

                            setSelectedFriends(editedArray)
                        }} className="ml-2 cursor-pointer m-1 w-4 h-4" /></div>
                    ) : <div><span>no friend selected</span></div>}
                </div>
                {/* friends list */}
                <div className="flex flex-col h-[8rem] overflow-y-auto">{loading ? <FriendListSkeleton /> : newFriends.length !== 0 ? newFriends.map(data =>
                    <div onClick={() => {
                        setError(false)
                        if (selectedFriends.filter(friendData => friendData._id === data._id).length === 0) {
                            setSelectedFriends(() => [...selectedFriends, data])

                        }
                    }} className="bg-[rgba(182,182,182,0.1)] overflow-y-auto p-2 cursor-pointer m-1 hover:bg-gray-500 transition-colors rounded-sm">
                        <div className="flex items-center">
                            <img className="w-9 h-9 rounded-full" src={data.profileImagePath} />
                            <span className="p-1">{data.name}</span>
                        </div>
                    </div>
                ) : <div className="p-1"><span>All of your friends are in this group</span></div>}</div>
            </div>
            <div className="w-full flex-col flex p-1">

                <SubmitButton onClick={() => {
                    if (selectedFriends.length === 0) {

                        setError(true)
                    } else {
                        ApiCall.addContactToGroup({ conversation_id: contact.conversation_id, new_contact_list: selectedFriends }).then(apiVal => {
                            console.log(apiVal.data.val);
                        })
                    }
                }} title="Add contacts" className={"m-auto bg-cyan-700"} />
                <InputErrorComponent show={error} title="You didn't choose any friend to add" />
            </div>
        </div>
    </div>)
}