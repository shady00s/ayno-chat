import { Request,Response } from "express";
import groups_model from "../../model/groups_model";
import { validationResult } from "express-validator";
import mongoose from "mongoose";

export default function createVoteController(req:Request,res:Response){
    const user = req.session.userData
    const vote_question = req.body.voteQuestion
    const vote_choices = req.body.voteChoices
    const message = req.body.message
    const conversation_id = req.body.conversation_id
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(501).json({message:"validation error",errors})  
        

    }else{
    
    
      try {
        const generatedVoteId = new mongoose.Types.ObjectId()
        groups_model.findOneAndUpdate({conversation_id:conversation_id},{
            $push:{
            messages:{
                message:message,
                vote:{
                    voteQuestion:vote_question,
                    voteChoices:vote_choices,
                    voteCreator:{creatorName:user.userName,creatorProfilePath:user.userProfilePath},
                    },
                sender_image_path:user.userProfilePath,
                sender_id:user.userId,
                type:"vote"
        
        }}},{new:true}).then(resData=>{
            if(resData !==null){
                res.status(201).json({message:"succssess",body: resData})

            }
        })
    } catch (error) {
      res.status(501).json({message:"there is an error",error})  
    }
    }
}