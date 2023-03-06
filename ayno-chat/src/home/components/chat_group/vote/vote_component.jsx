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

    const voteOptionsRatio = useCallback(() => {
        let voteVal
        let vote = 0
        let newArray = []
        for (let index = 0; index < props.message.vote.voteChoices.length; index++) {
            if (props.message.vote.voteParticepents[index] !== undefined) {
                if (props.message.vote.voteParticepents[index].particepentChoice === props.message.vote.voteChoices[index].voteData) {
                    vote++
                    voteVal = Math.round((vote / props.message.vote.voteParticepents.length) * 100)
                    newArray.push(voteVal)

                } else {
                    newArray.push(0)

                }
            } else {

                newArray.push(voteVal)
            }


        }
        setVoteRatio(() => [...newArray])

    }, [])

    const getSelectedVote = useCallback(() => {
        for (let index = 0; index < props.message.vote.voteChoices.length; index++) {
            if (props.message.vote.voteParticepents[index] !== undefined) {
                if (props.message.vote.voteParticepents[index].particepentChoice === props.message.vote.voteChoices[index].voteData) {
                    console.log(props.message.vote.voteChoices[index].voteData)
                    return setSelected(props.message.vote.voteChoices[index])
                }
            }
        }
    }, [])
    console.log(selected)
    useEffect(() => {
        if (props.message.vote.voteParticepents.length !== 0) {
            voteOptionsRatio()
            getSelectedVote()
            for (let x = 0; x < props.message.vote.voteParticepents.length; x++) {
                if (props.message.vote.voteParticepents[x].prticipentId === user.id) {
                    setParticeped(true)
                }
                else {
                    setParticeped(false)
                }

            }
        }

    }, [])


    return (
        <div className="w-full m-1">

            <div className="flex w-[90%] flex-col bg-[#1E2329] rounded-md p-3 float-right">
                <span className="text-slate-400 text-sm m-1">{props.message.vote.voteCreator.creatorName} added a vote</span>
                <span className="text-slate-300 text-sm ml-2 m-1">{props.message.vote.voteQuestion}</span>

                {props.message.vote.voteChoices.map((data, index) => <div className="p-1 items-center relative m-1 w-full h-[3rem] flex"><input disabled={particeped} onChange={() => {
                    setSelected(() => data)
                }} value={data} checked={selected.voteData === data.voteData} type="radio" /> <p className="text-slate-300 break-words p-1 h-[2rem] w-[80%]">{data.voteData}</p>
                    <div className={` w-[${voteRatio[index]}%] rounded-md left-0 top-0 absolute flex justify-end items-center bg-[rgba(182,192,232,0.1)] h-full`}>
                        {voteRatio[index] !== 0 ? <span className=' text-sm text-slate-500 p-1'>{voteRatio[index] + " %"}</span> : ""}
                    </div>
                </div>
                )}
                <span className='text-sm text-slate-500'>{props.message.vote.voteParticepents.length}/{contact.members_number} members participated</span>
                <SubmitButton className={`${particeped ? " hidden" : "block"} bg-gray-700`} title="sumbit vote" onClick={() => {
                    ApiCall.sendVoteParticipent({
                        conversation_id: contact.conversation_id,
                        voteId: props.message.vote.voteId,
                        participent_choice: selected.voteData
                    }).then(val => {
                        console.log(val.data);
                    })
                }} />
            </div>

        </div>
    )
}