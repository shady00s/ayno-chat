import { UserPlus,MessageSquare } from "react-feather"
import { useContext } from "react"
import ContactContext from './../../context/contactContext';
import ApiCall from './../../api_call';
import StorageManager from './../../utils/storage_manager';


async function sendRequest(data){

        ApiCall.postFriendRequest({
            friend_id:data,
            user_id: StorageManager.getDataFromStorage().id,
        })
    }


const SearchResultComponent = (props)=>{



   
   
    const {contact,setContact}=useContext(ContactContext)
    return(<>
    <div className="flex items-center bg-subBackGround p-1 m-1 mb-3 rounded-md">
        <div className=" w-full">
            <h2 className="text-slate-200 ml-2">{props.data.name}</h2>
            <div className="flex items-center m-2">
            <img className="ml-2 w-8 rounded-full" alt="profile" src={props.data.profileImagePath}/>
            <p className="text-slate-500 ml-2 m-2">{props.data.isFriend?"In your friends":"This user is not your friend." }</p>

            </div>
            <div className="pt-2 pb-2 flex justify-center w-full">

              {!props.data.isFriend? <button onClick={()=>{sendRequest(props.data.id)}} className="m-auto p-1 rounded-md text-slate-300 border-2 border-slate-800 flex justify-center items-center text-sm"><UserPlus className="mr-1 stroke-sky-600"   size={17}/> Add Friend</button>:null}  
                <button className=" p-1 rounded-md text-slate-300 border-2 border-slate-800 flex justify-center items-center text-sm"><MessageSquare className="mr-1 stroke-pink-600" size={17}/>Send Message</button>
            </div>
        </div>
    </div>

    </>)
}

export default SearchResultComponent