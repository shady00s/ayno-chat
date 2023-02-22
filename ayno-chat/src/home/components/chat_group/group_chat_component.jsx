import { useEffect, useState, useContext } from 'react';
import ApiCall from './../../../api_call';
import ContactContext from './../../../context/contactContext';
import SocketContext from './../../../context/socketContext';
export default function GroupChatButtonComponent(props){
    const [contacts,setContacts]=useState([])
    const [indexSelected,setIndexSelected]=useState(-1)
    const {setContact} = useContext(ContactContext)
    useEffect(()=>{
        if(props.data.conversation_id !== undefined){
            ApiCall.getGroupContacts(props.data.conversation_id).then(val =>{
                setContacts(val.data.body)
            })
        }
    },[props.data])

 
    return(
    <div  onClick={()=>{
        ApiCall.getGroupsInfo(props.data.conversation_id).then(data=>{
            setContact({conversation_id:data.data.body.conversation_id,type:'group'})
        })
}} className="cursor-pointer hover:bg-[rgba(153,190,253,0.2)] w-[95%] m-1  bg-[rgba(123,167,243,0.06)] rounded-lg flex-col  flex  justify-center">
        <div className='flex items-center w-[94%] pl-1 relative'>
            <h1 className='ml-4   text-ellipsis text-slate-200 select-none'>{props.data.conversation_name}</h1>
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