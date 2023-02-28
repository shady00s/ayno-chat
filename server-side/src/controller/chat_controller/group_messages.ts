import { Request,Response } from "express";
import groups_model from "../../model/groups_model";
import mongoose from "mongoose";
export default function getGroupMessages(req:Request,res:Response){
    const conversation_id = req.query.conversation_id
    const pageNumber = req.query.page || 0
    if(conversation_id !== ""){
        try {
     

            const page = parseInt(pageNumber.toString())
            const perPage = 50
            const skip = (page -1) * perPage;
                 groups_model.aggregate([
                     {$match:{conversation_id:new mongoose.Types.ObjectId(conversation_id.toString()) }},
                    {$project:{messages:{$slice:["$messages",skip,perPage]}}},
                    {$unwind:"$messages"},
    
                    {$sort:{"messages.date":1}}
                ]).exec((error,result)=>{
                    if(error){
                        res.status(500).json({
                            message:"there is an error",
                           error
                        })  
                    }else{
                        res.status(200).json({
                                    message:"succssess",
                                    pageNumber:page,
                                    conversations:result
                                })  
                    }
                })
            } catch (error) {
                res.status(500).json({
                    message:"therer is an error",
                    error
                })  
            }
    }else{
        res.status(500).json({message:"conversation_id is empty"})
    }
    
}