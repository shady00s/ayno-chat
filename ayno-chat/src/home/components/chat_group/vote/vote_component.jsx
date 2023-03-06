import { useContext, useState, useEffect, useCallback } from 'react';
import ApiCall from '../../../../api_call';
import SubmitButton from '../../../../registration/components/submit_button'
import UserContext from '../../../../context/userContext'
import ContactContext from '../../../../context/contactContext'
export default function VoteComponent(props) {
    const { contact } = useContext(ContactContext)
    const [selected, setSelected] = useState(-1)
    const [particeped, setParticeped] = useState(false)
    const [voteRatio, setVoteRatio] = useState([])
    const { user } = useContext(UserContext)
    const voteOptionsRatio = () => {
        let voteVal = 0
        let vote = 0
        let newArray = []
        for (let index = 0; index < props.message.votingData.voteChoices.length; index++) {
            for (let index1 = 0; index1 < props.message.votingData.voteParticepents.length; index1++) {
               
                if (props.message.votingData.voteParticepents[index1].particepentChoice === props.message.votingData.voteChoices[index].voteId) {
                    vote ++
                    voteVal = Math.round((vote / contact.members_number) * 100)
                  
                    newArray.push(voteVal)

                } else {
                    newArray.push(0)

                }
            }
          


        }
        setVoteRatio(() => [...newArray])

    }

    const getSelectedVote = () => {
        if(props.message.votingData.voteParticepents !== undefined){
            for (let index1 = 0; index1 < props.message.votingData.voteChoices.length; index1++) {
                for (let index = 0; index < props.message.votingData.voteParticepents.length; index++) {
                    if(props.message.votingData.voteChoices[index1].voteId === props.message.votingData.voteParticepents[index].particepentChoice){
                       setSelected(props.message.votingData.voteChoices[index1])
                    }
                    
                }

        }}else{
            setSelected(-1)
        }
           

                // console.log({choice:{...props.message.votingData.voteChoices[index]}})
                // console.log({participent:{...props.message.votingData.voteParticepents[index]}})
                //console.log(props.message.votingData.voteParticepents[index].particepentChoice)
                
                
              
            
        
    }

    const getUserParticipation = ()=>{
        if (props.message.votingData.voteParticepents.length !== 0) {
           
            for (let x = 0; x < props.message.votingData.voteParticepents.length; x++) {
                if (props.message.votingData.voteParticepents[x].prticipentId === user.id) {
                    setParticeped(true)
                }
                else {
                    setParticeped(false)
                }

            }
        }
    }
    useEffect(() => {
            voteOptionsRatio()
            getSelectedVote()
            getUserParticipation()

    }, [props.message.votingData])


    return (
        <div className="w-full m-1">

            <div className="flex w-[90%] flex-col bg-[#1E2329] rounded-md p-3 float-right">
                <span className="text-slate-400 text-sm m-1">{props.message.votingData.voteCreator.creatorName} added a vote</span>
                <span className="text-slate-300 text-sm ml-2 m-1">{props.message.votingData.voteQuestion}</span>

                {props.message.votingData.voteChoices.map((data, index) => <div className="p-1 items-center relative m-1 w-full h-[3rem] flex"><input disabled={particeped} onChange={() => {
                    setSelected(() => data)
                }} value={data} checked={selected.voteId === data.voteId} type="radio" /> <p className="text-slate-300 break-words p-1 h-[2rem] w-[80%]">{data.voteData}</p>
                    <div className={` w-[${voteRatio.length!==0?voteRatio[index]:"0"}%] rounded-md left-0 top-0 absolute flex justify-end items-center bg-[rgba(182,192,232,0.1)] h-full`}>
                        {voteRatio[index] !== 0 && voteRatio[index] !== undefined? <span className=' text-sm text-slate-500 p-1'>{voteRatio[index] + " %"}</span> : ""}
                    </div>
                </div>
                )}
                <span className='text-sm text-slate-500'>{props.message.votingData.voteParticepents.length}/{contact.members_number} members participated</span>
                <SubmitButton className={`${particeped ? " hidden" : "block"} bg-gray-700`} title="sumbit vote" onClick={() => {
                    ApiCall.sendVoteParticipent({
                        conversation_id: contact.conversation_id,
                        voteId: props.message.votingData.voteId,
                        participent_choice: selected.voteId
                    }).then(val => {
                        console.log(val.data)
                    })
                }} />
            </div>

        </div>
    )
}