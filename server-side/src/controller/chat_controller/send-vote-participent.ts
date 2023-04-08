import { Request, Response } from "express";
import groups_model from "../../model/groups_model";
import { socketManager } from "../../sockets/socket_manager";

export default function sendVoteParticipent(req:Request,res:Response){
    const user= req.session.userData
    const conversation_id = req.body.conversation_id
    const vote_id = req.body.voteId
    const particepentChoice = req.body.participent_choice


    
      try {
       
        groups_model.countDocuments({conversation_id:conversation_id,"messages.votingData.voteId":vote_id ,"messages.votingData.voteParticepents":{$elemMatch:{particepentChoice: particepentChoice, prticipentId:user.userId }}}).then((val)=>{
            if(val === 0){
                groups_model.findOneAndUpdate({conversation_id:conversation_id,"messages.votingData.voteId":vote_id},{$push:{"messages.$.votingData.voteParticepents":{ particepentChoice: particepentChoice, prticipentId:user.userId }}},{new:true}).then(()=>{
                    res.status(200).json({message:"succssess"})
                })
            }else{
                res.status(200).json({message:"already participent"})
            }
    
        }
        )
      } catch (error) {
        
      }
    

}