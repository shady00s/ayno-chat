import React,{ useContext, useState, useEffect, useCallback } from 'react';
import ApiCall from '../../../../api_call';
import SubmitButton from '../../../../registration/components/submit_button'
import UserContext from '../../../../context/userContext'
import ContactContext from '../../../../context/contactContext'
import SocketContext from './../../../../context/socketContext';
const VoteComponent = (props)=> {
    const socket = useContext(SocketContext)
    const { contact } = useContext(ContactContext)
    const [selected, setSelected] = useState(-1)
    const [particeped, setParticeped] = useState(false)
    const [voteRatio, setVoteRatio] = useState([])
    const { user } = useContext(UserContext)
    const [voteParticipations, setVoteParticipations] = useState(props.message.votingData.voteParticepents)
    const [loading,setLoading]=useState(false)
    const voteOptionsRatio = useCallback(() => {


        let voteVal = 0
        let vote = 0
        let newArray = []
        for (let index = 0; index < props.message.votingData.voteChoices.length; index++) {
            for (let index1 = 0; index1 < voteParticipations.length; index1++) {

                if (voteParticipations[index1].particepentChoice === props.message.votingData.voteChoices[index].voteId) {
                    vote++
                    voteVal = Math.round((vote / contact.members_number) * 100)

                    newArray.push(voteVal)

                } else {
                    newArray.push(0)

                }
            }



        }
        setVoteRatio(() => [...newArray])

    },[voteParticipations])

    const getSelectedVote = useCallback(() => {


        if (voteParticipations !== undefined) {
            for (let index1 = 0; index1 < props.message.votingData.voteChoices.length; index1++) {

                for (let index = 0; index < voteParticipations.length; index++) {
                    if (props.message.votingData.voteChoices[index1].voteId === voteParticipations[index].particepentChoice) {
                        setSelected(props.message.votingData.voteChoices[index1])
                    }

                }

            }
        } else {
            setSelected(-1)
        }

    },[voteParticipations])

    const getUserParticipation = useCallback(() => {

        if (voteParticipations.length !== 0) {

            for (let x = 0; x < voteParticipations.length; x++) {
                if (voteParticipations[x].prticipentId === user.id) {
                    setParticeped(true)
                }
                else {
                    setParticeped(false)
                }

            }
        }
    },[voteParticipations])
    useEffect(() => {
        voteOptionsRatio()
        getSelectedVote()
        getUserParticipation()

    }, [voteParticipations,props.message.votingData])

    useEffect(() => {
        socket.on('recive-vote-participent', (participentData) => {
                let newArray = []
                
                newArray.push(...voteParticipations,participentData)
                setVoteParticipations(() =>newArray)

            

        })
        return (() => { socket.off('recive-vote-participent') })
    }, [socket])

    return (
        <div className="w-full m-1">

            <div className="flex w-[90%] flex-col bg-[#1E2329] rounded-md p-3 float-right">
                <span className="text-slate-400 text-sm m-1">{props.message.sender_name} added a vote</span>
                <span className="text-slate-300 text-sm ml-2 m-1">{props.message.votingData.voteQuestion}</span>

                {props.message.votingData.voteChoices.map((data, index) => <div onClick={()=>{
                     setSelected(() => data)
                }} className="p-1 items-center cursor-pointer relative m-1 w-full h-[3rem] flex"><input disabled={particeped}
                    value={data} checked={selected.voteId === data.voteId} type="radio" /> <p className="text-slate-300 break-words p-1 h-[2rem] w-[70%]">{data.voteData}</p>
                    <div style={{ width: voteRatio.length !== 0 && voteRatio[index] !== undefined ? `${voteRatio[index]}%` : 0 }} className={` transition-all duration-75 ease-out rounded-md left-0 top-0 absolute flex justify-end items-center bg-[rgba(182,192,232,0.1)] h-full`}>
                        {voteRatio[index] !== 0 && voteRatio[index] !== undefined ? <span className=' text-sm text-slate-500 p-1'>{voteRatio[index] + " %"}</span> : ""}
                    </div>
                </div>
                )}
                <span className='text-sm text-slate-500'>{voteParticipations.length}/{contact.members_number} members participated</span>
                <SubmitButton future={loading} className={`${particeped ? " hidden" : "block"} bg-gray-700`} title="sumbit vote" onClick={() => {

                    socket.emit("send-vote-participent", { particepentChoice: selected.voteId, prticipentId: user.id  }, contact.conversation_id)
                        setLoading(true)
                    ApiCall.sendVoteParticipent({
                        conversation_id: contact.conversation_id,
                        voteId: props.message.votingData.voteId,
                        participent_choice: selected.voteId
                    }).then(val => {
                        setLoading(false)

                    })
                }} />
            </div>

        </div>
    )
}


export default React.memo(VoteComponent)