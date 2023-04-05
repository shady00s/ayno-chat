import { Request, Response } from "express";
import groups_model from "../../model/groups_model";

export default function sendVoteParticipent(req:Request,res:Response){
    const user_id = req.session.userData.userId
    const conversation_id = req.body.conversation_id
    const vote_id = req.body.voteId
    const particepentChoice = req.body.participent_choice
    groups_model.countDocuments({conversation_id:conversation_id,"messages.votingData.voteId":vote_id ,"messages.votingData.voteParticepents":{$elemMatch:{particepentChoice: particepentChoice, prticipentId:user_id }}}).then((val)=>{
        if(val === 0){
            groups_model.findOneAndUpdate({conversation_id:conversation_id,"messages.votingData.voteId":vote_id},{$push:{"messages.$.votingData.voteParticepents":{ particepentChoice: particepentChoice, prticipentId:user_id }}},{new:true}).then(()=>{
                res.status(200).json({message:"succssess"})
            })
        }else{
            res.status(200).json({message:"already participent"})
        }

    }
    )

}