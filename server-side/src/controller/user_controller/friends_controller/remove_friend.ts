import { Request,Response } from "express";
import { validationResult } from 'express-validator';
import user_model from "../../../model/user_model";
import mongoose from "mongoose";
export default async function removeFriend(req:Request,res:Response){
    const user_id = req.session.userData.userId
    const friend_id = req.body.friend_id
    console.log(friend_id);
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        
        try {
            user_model.findByIdAndUpdate({_id:user_id},{$pull:{friends:friend_id}},{new:true}).select(["-password","-groups","-conversations"]).then(newData=>{
                res.status(201).json({message:"succssess",body:newData})
            })


        } catch (error) {
            res.status(501).json({message:"error",error})

        }
    }

}