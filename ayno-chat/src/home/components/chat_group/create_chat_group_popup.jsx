import { useContext ,useEffect,useState, useRef} from "react"
import NavigationContext from './../../../context/navigationContext';
import InputTextComponent from "../../../registration/components/input_text_component";
import ApiCall from './../../../api_call';
import { FriendListSkeleton } from "../../../reusable-components/skeleton/friend_list";
import EmptyContactComponent from "../friends/empty_contacts_component";
import Selectmember from "./selectMemeber";
import SubmitButton from "../../../registration/components/submit_button";
import {X} from 'react-feather'
import InputErrorComponent from "../../../registration/components/input_error_component";
import { list } from "postcss";
export default function CreateChatGroupPopup(){
    const {navigation,setNavigation}=useContext(NavigationContext)
    const [loading,setLoading]= useState(false)
    const [loadingReq,setLoadingReq]= useState(false)
    const [friendsList,setFriendsList]= useState([])
    const [selected,setSelected] = useState([])
    const [error,setError]=useState({name:false,list:false})
   
    const groupName = useRef("")
    useEffect(()=>{

        setLoading(true)
        ApiCall.getFriendsList().then(friends=>{
            
            if (friends.status === 200) {
                console.log(friends.data.body);
                setFriendsList(() => friends.data.body.friends)
                setLoading(false)
            } else {
                setFriendsList(() => [])
                setLoading(false)
            }
        }).catch(err=>{
            alert(err)
        })
    },[])
    return( <>{navigation =='create-Group'?  <div id="create-group-bg" onClick={(e)=>{
        if(e.target.id === "create-group-bg"){
            setNavigation("")
        }
    }} className=" absolute flex z-50 justify-center items-center w-screen h-screen bg-theme">

    <div className=" bg-slate-800  w-4/6 lg:w-5/12  rounded-xl p-2 transition-all duration-100 ease-in">
        <div className="flex justify-between items-center">
        <h1 className="text-slate-200 p-2">Create new Group</h1>
        <div onClick={()=>{setNavigation('Contacts')}} className="flex select-none cursor-pointer p-2 rounded-md transition-all duration-75 ease-in hover:bg-[rgba(116,121,219,0.2)]">
        <X className="stroke-slate-500"/>
        <span className="text-slate-500">close</span>
        </div>
        
        </div>
        <div className="flex flex-wrap justify-center h-full w-full transition-all duration-100 ease-in items-center ">
        <div className="md:w-6/12 w-11/12">
            <InputTextComponent onChange={(val)=>{
                groupName.current = val.target.value
                setError(()=>({...error,name:false}))
                }} placeHolder={"Conversation name"}/>
                <div className="h-7 w-full">

                    <InputErrorComponent title={"please type Group's name"} show={error.name}/>
                </div>
        </div>
        <div className="md:w-6/12 w-full flex flex-col justify-center overflow-y-auto">
            <div className="flex justify-between items-center p-2">

            <h1 className="text-sm p-2 text-slate-200">Choose your friends</h1>
            <span className="text-sm text-slate-500">{selected.length} Selected</span>
            </div>
            <div className="w-full h-7">
            <InputErrorComponent title={"please select at least one friend"} show={error.list}/>

            </div>

            {
                loading ?  <div className="w-full h-20"><FriendListSkeleton /></div>:friendsList.length !==0? friendsList.map(friends=><Selectmember onClick={(data)=>{
                  let isExisted =   selected.some(selectedData => selectedData === data._id)
                   setError(()=>({...error,list:false}))                           
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
            
            console.log(groupName.current==="");
             if(groupName.current===""){
                setError(()=>({...error,name:true}))
            }
            if(selected.length=== 0){
                setError(()=>({...error,list:true}))
            }
            console.log(error);
           if(error.name===false && error.list ===false){
               setLoadingReq(true)
                ApiCall.createGroup({
                    groupName:groupName.current,
                    groupMembers:selected,
                }).then(val=>{
                    setLoadingReq(false)
                    setNavigation("Contacts")
                }).catch(err=>{
                    setLoading(false)
                })
            }
           
        }}  className='bg-emerald-600 p-2' title={'Create group'}/>

        
        </div>

    </div>
</div>:<div></div>}</>
       
                       

       
    )
}