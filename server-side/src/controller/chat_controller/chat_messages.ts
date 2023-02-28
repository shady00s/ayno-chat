import { Request,Response } from "express"
import user_model from "../../model/user_model";
import conversation_model from "../../model/conversation_model";
import mongoose from "mongoose";
const getChatMessages= async (req:Request,res:Response)=>{
    
    // const user_id = req.session.userData.userId;
    // let friend_id = req.query.friend_id;
    const conversation_id = req.query.conversation_id
    const pageNumber = req.query.page || 0;
    if(conversation_id !== undefined){
        try {
     

        const page = parseInt(pageNumber.toString())
        const perPage = 50
        const skip = (page -1) * perPage;
             conversation_model.aggregate([
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
        res.status(500).json({
            message:"invalid arguments",
            
        })
    }
  
    
}

export default getChatMessages