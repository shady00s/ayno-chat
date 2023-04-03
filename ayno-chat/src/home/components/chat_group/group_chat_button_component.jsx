import { useEffect, useState, useContext } from 'react';
import ApiCall from '../../../api_call';
import SocketContext from '../../../context/socketContext';
import {Plus } from 'react-feather'
import NavigationContext from './../../../context/navigationContext';
import { useSelector, useDispatch } from 'react-redux';
import { setNewContact } from '../../../redux/slice';
export default function GroupChatButtonComponent(props){

    const socket = useContext(SocketContext)
    const [contacts,setContacts]=useState([])
    const [indexSelected,setIndexSelected]=useState(-1)

    const contact = useSelector((state)=>state.data.contact)
    const setContact = useDispatch()

    const {setNavigation}=useContext(NavigationContext)
    useEffect(()=>{
        if(props.data.conversation_id !== undefined){
            ApiCall.getGroupContacts(props.data.conversation_id).then(val =>{
                setContacts(val.data.body)

            })
        }
    },[props.data])

 
    return(
    <div  onClick={(e)=>{
        setNavigation('')
        ApiCall.getGroupsInfo(props.data.conversation_id).then(data=>{

            setContact(setNewContact({conversation_id:data.data.body.conversation_id,type:'group',groupName:data.data.body.conversation_name,
            members_number:data.data.body.members_count,
            members_colors:data.data.body.members_color
        
        }))
            socket.emit('join-group-conversation',data.data.body.conversation_id)
        })
}} className="cursor-pointer hover:bg-[rgba(153,190,253,0.2)] w-[95%] m-1  bg-[rgba(123,167,243,0.06)] rounded-lg flex-col  flex  justify-center">
        <div className='flex items-center w-[94%] pl-1 relative justify-between p-1'>
            <h1 className='ml-4   text-ellipsis text-slate-200 select-none'>{props.data.conversation_name}</h1>

            <div  onClick={(e)=>{
                e.stopPropagation()
                setNavigation({name:'add-contact-group',conversation_id:props.data.conversation_id})

            }} className='flex items-center p-1 hover:bg-slate-600 rounded-md'>

                <Plus className='stroke-gray-500'/>
                <span className='text-sm  text-gray-400'>Add contact</span>
            </div>
        </div>
                <h6 className='p-1 pl-3 text-slate-400 text-sm select-none'>members</h6>

        <div className='flex overflow-y-auto w-full select-none '>
    {contacts.length !== 0? contacts.map((data,index)=><div key={index} onMouseLeave={(event)=>{
            setIndexSelected(-1)

        }}  className='ml-2 mr-2  flex flex-col justify-evenly items-center overflow-x-hidden '>
            <h5 className={`text-slate-200 text-sm  bg-theme rounded-md pl-2 pr-2 p-1 ${indexSelected === index?"opacity-100":"opacity-0"} transition-opacity duration-100 ease-in-out`}>{data.name}</h5>
            <img onMouseEnter={(event)=>{
            setIndexSelected(index)
        }} src={data.profileImagePath} className='w-8 h-8 ml-2 m-2 rounded-full'/></div>):<></>}

        </div>
    </div>
    )
}