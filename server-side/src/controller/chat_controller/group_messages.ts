import { Request,Response } from "express";
import groups_model from "../../model/groups_model";
export default function getGroupMessages(req:Request,res:Response){
    const conversation_id = req.query.conversation_id

    if(conversation_id !== ""){
        try {
        groups_model.findOne({conversation_id:conversation_id}).select(["-__v",'-members_ids',"-_id"]).then(val=>{
            if(val !==null){
                res.status(200).json({message:"succssess",body:val})
            }else{
                res.status(500).json({message:"conversation is not found"})
            }
        })
        } catch (error) {
            res.status(500).json({message:"there is an error",error})
        }
    }else{
        res.status(500).json({message:"conversation_id is empty"})
    }
    
}