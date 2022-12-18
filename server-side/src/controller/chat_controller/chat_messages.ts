import { Request,Response } from "express"
import user_model from "../../model/user_model";

const getChatMessages= (req:Request,res:Response)=>{
    const user_name = req.params.user_name;

    try {
        user_model.findOne({name:user_name}).then(responseData=>{
            res.status(200).json({
                message:"succssess",
                body:responseData.conversations
            })
        })
    } catch (error) {
        
    }
    
}

export default getChatMessages