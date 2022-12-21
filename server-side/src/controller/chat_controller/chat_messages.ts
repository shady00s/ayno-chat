import { Request,Response } from "express"
import user_model from "../../model/user_model";

const getChatMessages= (req:Request,res:Response)=>{
    const user_name = req.params.user_name;
    if(user_name !== null){
        try {
            user_model.findOne({name:user_name}).then(responseData=>{
                res.status(200).json({
                    message:"succssess",
                    conversations:responseData.conversations
                })
            })
        } catch (error) {
            
        }
        
    }else{
        res.status(204).json({
            message:"invalid username or user not found",
            
        })
    }
  
    
}

export default getChatMessages