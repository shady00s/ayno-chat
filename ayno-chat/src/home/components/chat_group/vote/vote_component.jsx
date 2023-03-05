import { useContext, useState ,useEffect} from 'react';
import ApiCall from '../../../../api_call';
import SubmitButton from '../../../../registration/components/submit_button'
import UserContext from '../../../../context/userContext'
import ContactContext from '../../../../context/contactContext'
export default function VoteComponent(props){
    const {contact} = useContext(ContactContext)
    const [selected,setSelected] = useState(-1)
    const [particeped,setParticeped]=useState(false)
    const [voteRatio,setVoteRatio]= useState(0)
    const {user} = useContext(UserContext)
    useEffect(()=>{
        if(props.message.vote.voteParticepents.length !== 0){

            for(let x = 0;x < props.message.vote.voteParticepents.length;x++){
                if(props.message.vote.voteParticepents[x].prticipentId ===user.id){
                    setParticeped(true)
                    setSelected(()=>props.message.vote.voteChoices[0].voteId)
                    console.log(selected);
                }
                setVoteRatio(()=>((props.message.vote.voteParticepents.length / contact.members_number) *100))
                
            }
        }
        
    },[props.message.vote])
    
    
    console.log(selected);
    
    return(
        <div className="w-full m-1">
        
            <div className="flex w-[90%] flex-col bg-[#1E2329] rounded-md p-3 float-right">
            <span className="text-slate-400 text-sm m-1">{props.message.vote.voteCreator.creatorName} added a vote</span>
            <span  className="text-slate-300 text-sm ml-2 m-1">{props.message.vote.voteQuestion}</span>
           
            {props.message.vote.voteChoices.map(data=> <div className="p-1 items-center relative m-1 w-full h-[3rem] flex"><input disabled={particeped} onChange={()=>{
                setSelected(()=>data)
                console.log(selected);
            }}  value={data} checked={selected == data.voteId?true:false} type="radio"/> <p className="text-slate-300 break-words p-1 h-[2rem] w-[80%]">{data.voteData}</p>
            <div className={`w-[${voteRatio}%] rounded-md left-0 top-0 absolute bg-[rgba(182,192,232,0.1)] h-full`}>

            </div>
            </div>
)}
<span className='text-sm text-slate-500'>{props.message.vote.voteParticepents.length}/{contact.members_number} members participated</span>
            <SubmitButton className={`${particeped?" hidden":"block"} bg-gray-700`} title="sumbit vote" onClick={()=>{
                ApiCall.sendVoteParticipent({
                    conversation_id:contact.conversation_id,
                    voteId:props.message.vote.voteId,
                    participent_choice:selected.voteData
                }).then(val=>{
                    console.log(val.data);
                })
            }}/>
            </div>
            
        </div>
    )
}