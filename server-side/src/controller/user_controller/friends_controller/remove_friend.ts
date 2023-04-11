import { Request,Response } from "express";
import { validationResult } from 'express-validator';
import user_model from "../../../model/user_model";
import mongoose from "mongoose";
export default async function removeFriend(req:Request,res:Response){
    const user_id = req.session.userData.userId
    const friend_id = req.body.friend_id
    const errors = validationResult(req)

    let session = await mongoose.startSession()    
    try {
    if (errors.isEmpty()) {
        session.startTransaction()
        await user_model.findByIdAndUpdate({_id:user_id},{$pull:{friends:friend_id}},{new:true}).session(session).select(["-password","-groups","-conversations"])
        
        await user_model.findByIdAndUpdate({_id:friend_id},{$pull:{friends:user_id}},{new:true}).session(session).select(["-password","-groups","-conversations"])
        
       await session.commitTransaction().then(()=>{
            res.status(201).json({message:"succssess"})
        })

    }else{
        res.status(501).json({message:"error",errors})

    }
        } catch (error) {
            console.log(error);
            res.status(501).json({message:"error",error})
        }finally{
            await session.endSession()
        }

}