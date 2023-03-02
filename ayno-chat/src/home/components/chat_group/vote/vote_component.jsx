export default function VoteComponent(props){
    console.log(props.message);
    return(
        <div className="w-full m-1">
        
            <div className="flex w-[90%] flex-col bg-[#1E2329] rounded-md p-3 float-right">
            <span className="text-slate-400 text-sm m-1">{props.message.vote.voteCreator.creatorName} added a vote</span>
            <span  className="text-slate-300 text-sm ml-2 m-1">{props.message.vote.voteQuestion}</span>
           
            {props.message.vote.voteChoices.map(data=> <div className="p-1 items-center  w-full h-[4rem] flex"><input type="radio"/> <p className="text-slate-300 break-words p-1 h-[2rem] w-[80%]">{data.voteData}</p></div>
)}
            </div>
        </div>
    )
}