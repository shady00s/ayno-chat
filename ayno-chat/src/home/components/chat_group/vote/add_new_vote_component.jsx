import { useContext, useState } from "react"
import NavigationContext from './../../../../context/navigationContext';
import InputTextComponent from "../../../../registration/components/input_text_component";
import InputErrorComponent from './../../../../registration/components/input_error_component';
import { Plus,Trash2 } from "react-feather";
import SubmitButton from './../../../../registration/components/submit_button';
import ApiCall from "../../../../api_call";
import SocketContext from './../../../../context/socketContext';
import { useSelector } from "react-redux";

export default function AddNewVote(){
    const {navigation,setNavigation}= useContext(NavigationContext)
    const [pollChoices,setPollChoices] = useState([])
    const [pollText,setPollText]= useState('')
    const [voteQuestion,setVoteQuestion]= useState('')
    const  contact  = useSelector((state)=>state.data.contact)
    const [error,setError] = useState({question:null,choice:null,isEmpty:null})
    const user=useSelector((state)=>state.data.user)
    const socket = useContext(SocketContext)
    const [loading,setLoading]= useState(false)
    return(
        <>
        {/* main container */}
            <div onClick={(event)=>{

                if(event.target.id === "bg"){
                    setNavigation("")
                }
            }} id="bg" className={`${navigation === "vote-menu"? "translate-x-0 opacity-100":"translate-x-[999px] opacity-0"} duration-100 transition-opacity ease-out flex justify-center items-center z-10 absolute w-[100%] h-[90%] bg-theme top-10 left-0`}>
                {/* vote container */}
                <div className="w-[70%] rounded-md h-[80%] bg-slate-700 overflow-y-auto p-3">
                    <h4 className="text-slate-200">Create vote</h4>
                    <div className="flex flex-col justify-start items-start mt-5">
                    <span className="text-slate-300 text-sm">Vote question</span>
                    <InputTextComponent onChange={(event)=>{
                        setError((pre)=>({...pre,question:null}))
                        setVoteQuestion(event.target.value)
                    }} placeHolder="add your vote question"/>
                    <InputErrorComponent show={error.question!==null?true:false} title="Please enter the vote question"/>
                    <span className="text-slate-300 text-sm">Vote choices</span>
                    {/* vote choices */}
                    <div className="flex justify-between  items-center">
                        <div className="w-[90%]">
                    <InputTextComponent value={pollText}  onChange={(e)=>{
                        setPollText(e.target.value)
                    }} placeHolder="add your vote question"/>

                        </div>
                    <Plus onClick={()=>{
                        
                        if(pollText !== ""){
                            setPollChoices(prev=>[...prev,{voteId:Math.random(Math.random()* 100), voteData:pollText}])
                            setPollText("")
                            setError(pre=>({...pre,choice:null}))

                        }else{

                            setError(pre=>({...pre,choice:true}))
                        }
                    }} className="m-1 cursor-pointer stroke-slate-400"/>

                    </div>
                    <InputErrorComponent show={error.choice!==null?true:false} title="You can't add empty vote choice"/>
                    <span className="text-slate-300 text-sm">Vote poll choices</span>
                        <div className="p-1 m-1 w-full">
                            {pollChoices.length !==0 ? <div className="flex flex-col w-[70%] h-auto">
                                {pollChoices.map((data,index)=> <div key={index} className="flex justify-between items-center h-[2.5rem] m-1 w-full p-1"><p className=" break-words w-[80%] text-slate-200" key={data.data+"s"}> {data.voteData}</p><div
                                
                                onClick={(event)=>{
                                    let a = event.target.parentElement.previousSibling.innerText
                                setPollChoices(pollChoices.filter(dataFromArray=> dataFromArray.voteData !== a))
                                    
                                }}
                                ><Trash2 size={27} className=" cursor-pointer stroke-slate-500" 
                              /></div></div>)}
                            </div>
                            
                            
                            : <div className="flex justify-center items-center w-full h-[7rem]"><span className="text-slate-400 text-sm ">There is no choices added</span></div>}
                        </div>
                    </div>
                    <div className="w-full flex flex-col justify-center items-center">
                    <SubmitButton future={loading} onClick={()=>{
                         if(pollChoices.length  < 1){
                            setError((prev)=>({...prev,isEmpty:true}))
                        } if(error.choice ===null && error.isEmpty === null && error.question === null){
                            
                              setLoading(true)
                            ApiCall.createVote({
                                voteQuestion:voteQuestion,
                                voteChoices:pollChoices,
                                message:"voting",
                                conversation_id:contact.conversation_id,
                                voteQuestion:voteQuestion,
                                voteChoices:pollChoices
                            }).then(() => {

                                setLoading(false)
                                setNavigation("")}).catch(err=>{console.log(err)})
                        };
                    }} className=' w-[12rem] bg-sky-600' title={'add vote'}/>
                    <InputErrorComponent show={error.isEmpty!==null?true:false} title="You can't add empty vote choice"/>

                    </div>
                </div>
            </div>
        </>
    )
} 