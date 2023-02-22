import { useContext ,useEffect,useState, useRef} from "react"
import NavigationContext from './../../../context/navigationContext';
import InputTextComponent from "../../../registration/components/input_text_component";
import ApiCall from './../../../api_call';
import { FriendListSkeleton } from "../../../reusable-components/skeleton/friend_list";
import EmptyContactComponent from "../friends/empty_contacts_component";
import Selectmember from "./selectMemeber";
import SubmitButton from "../../../registration/components/submit_button";
import {X} from 'react-feather'
export default function CreateChatGroupPopup(){
    const {navigation,setNavigation}=useContext(NavigationContext)
    const [loading,setLoading]= useState(false)
    const [loadingReq,setLoadingReq]= useState(false)
    const [friendsList,setFriendsList]= useState([])
    const [selected,setSelected] = useState([])
    const groupName = useRef()
    useEffect(()=>{

        setLoading(true)
        ApiCall.getFriendsList().then(friends=>{
            
            if (friends.status === 200) {
                setFriendsList(() => friends.data.body.friends)
                setLoading(false)
            } else {
                setFriendsList(() => [])
                setLoading(false)
            }
        })
    },[])
    return( <>{navigation =='create-Group'?  <div  className=" absolute flex justify-center items-center w-screen h-screen bg-theme">

    <div className=" bg-slate-800 w-3/6 rounded-xl p-2 transition-all duration-100 ease-in">
        <div className="flex justify-between items-center">
        <h1 className="text-slate-200 p-2">Create new Group</h1>
        <div onClick={()=>{setNavigation('Contacts')}} className="flex select-none cursor-pointer p-2 rounded-md transition-all duration-75 ease-in hover:bg-[rgba(116,121,219,0.2)]">
        <X className="stroke-slate-500"/>
        <span className="text-slate-500">close</span>
        </div>
        
        </div>
        <div className="flex flex-wrap justify-center h-full w-full transition-all duration-100 ease-in items-center ">
        <div className="md:w-6/12 w-full">
            <InputTextComponent onChange={(val)=>{groupName.current = val.target.value}} placeHolder={"Conversation name"}/>
        </div>
        <div className="md:w-6/12 w-full flex flex-col justify-center overflow-y-auto">
            <div className="flex justify-between items-center p-2">

            <h1 className="text-sm p-2 text-slate-200">Choose your friends</h1>
            <span className="text-sm text-slate-500">{selected.length} Selected</span>
            </div>
            {
                loading ?  <FriendListSkeleton />:friendsList.length !==0? friendsList.map(friends=><Selectmember onClick={(data)=>{
                  let isExisted =   selected.some(selectedData => selectedData === data._id)
                                                                
                  if(isExisted){
                    let friendListRemovedFromList = selected.filter(oldData=> oldData !== data._id)
                    setSelected(friendListRemovedFromList)
                  }else{
                    setSelected(prev=>[...prev,data._id])
                  }
                }} key={friends.name} data={friends} /> ):<EmptyContactComponent/>
            }
        </div>
        <SubmitButton future={loadingReq} onClick={()=>{
            setLoadingReq(true)
            ApiCall.createGroup({
                groupName:groupName.current,
                groupMembers:selected,
            }).then(val=>{
                setLoadingReq(false)
                setNavigation("Contacts")
            })
        }}  className='bg-emerald-600 p-2' title={'Create group'}/>
        </div>

    </div>
</div>:<div></div>}</>
       
                       

       
    )
}