import React, { useContext, useState, useEffect, useCallback } from "react";
import ApiCall from "../../../../api_call";
import SubmitButton from "../../../../registration/components/submit_button";
import SocketContext from "./../../../../context/socketContext";
import { useDispatch, useSelector } from "react-redux";

const VoteComponent = (props) => {
  const socket = useContext(SocketContext);
  const contact = useSelector((state)=>state.data.contact);
  const [selected, setSelected] = useState(-1);
  const [particeped, setParticeped] = useState(false);
  const [voteRatio, setVoteRatio] = useState([]);
  const user = useSelector((state)=>state.data.user);
  const [voteParticipations, setVoteParticipations] = useState(props.message.votingData.voteParticepents);
  const [loading, setLoading] = useState(false);

   const voteOptionsRatio = useCallback(()=>{
    let vote = {};


    for (let index = 0;index < props.message.votingData.voteChoices.length;index++) {
        //vote.push({id:props.message.votingData.voteChoices[index].voteId,val:0});
      vote[props.message.votingData.voteChoices[index].voteId] = {...props.message.votingData.voteChoices[index],percentage:0}
    
      
    }
    for(let index = 0;index < voteParticipations.length;index++){
     
        let voteVal = 0
        
        if (vote[voteParticipations[index].particepentChoice].voteId === voteParticipations[index].particepentChoice) {
          voteVal = voteVal +1 
           
            const percentage = Math.round((voteVal / contact.members_number)*100)
            vote[voteParticipations[index].particepentChoice].percentage = percentage + vote[voteParticipations[index].particepentChoice].percentage
         
        } if (voteParticipations[index].prticipentId === user.id){
          setSelected({ voteId:voteParticipations[index].particepentChoice });
          setParticeped(true)
        }
      }
    
    setVoteRatio(()=>Object.values(vote))


    
},[voteParticipations]);



  useEffect(() => {
    socket.on("recive-vote-participent", (participentData) => {
      
      setVoteParticipations(()=>voteParticipations.concat(participentData))


    });
    
    return(()=>{
      socket.off('recive-vote-participent')
    })
  }, [socket]);
  
  function sendVoteParticipation(){
    setLoading(true);
    setParticeped(true);
    ApiCall.sendVoteParticipent({
      conversation_id: contact.conversation_id,
      voteId: props.message.votingData.voteId,
      participent_choice: selected.voteId,
    }).then(() => {
      socket.emit("send-vote-participent",{ particepentChoice: selected.voteId, prticipentId: user.id},contact.conversation_id);
      setVoteParticipations(()=>voteParticipations.concat({ particepentChoice: selected.voteId, prticipentId: user.id}))
      voteOptionsRatio ()
      
      setLoading(false);
    }).catch(err=>{console.log(err)});
  }
  useEffect(()=>{
    voteOptionsRatio()
  },[voteParticipations])
  
  return (
    <div className="w-full m-1">
      <div className="flex w-[90%] flex-col bg-[#1E2329] rounded-md p-3 float-right">
        <span className="text-slate-400 text-sm m-1">
          {props.message.sender_name} added a vote
        </span>
        <span className="text-slate-300 text-sm ml-2 m-1">
          {props.message.votingData.voteQuestion}
        </span>

        {props.message.votingData.voteChoices.map((data, index) => (
          <div
          key={index}
            onClick={() => {
              setSelected(()=>({...data}))
            }}
            className="p-1 items-center cursor-pointer relative m-1 w-[80%] h-[3rem] flex justify-start "
          >
            <input
              disabled={particeped}
              value={data}
              onChange={()=>{
                setSelected(()=>({...data}))
              }}
              checked={selected.voteId === data.voteId }
              type="radio"
            />
            <p className="text-slate-300 break-words p-1 h-[2rem] w-[66%]">
              {data.voteData}
            </p>
            <div
              style={
                {
                    width: voteRatio.length === 0 ? 0 :voteRatio[index].percentage+"%"
                }
              }
              className={` transition-all duration-75 ease-out rounded-md   flex justify-start items-center bg-[rgba(182,192,232,0.1)] h-full`}
            >
               <div className=" "> <span className="text-sm  text-gray-400 p-1">{voteRatio[index]?.percentage+"%"}</span></div>
            </div>
          </div>
        ))}
        <span className="text-sm text-slate-500">
          {voteParticipations.length}/{contact.members_number} members
          participated
        </span>
        <SubmitButton
          future={loading}
          className={`${particeped ? " hidden" : "block"} bg-gray-700`}
          title="sumbit vote"
          onClick={() => {
            sendVoteParticipation()
            
          
          }}
        />
      </div>
    </div>
  );
};

export default React.memo(VoteComponent);
