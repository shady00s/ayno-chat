import { Request,Response } from "express"
import user_model from "../../model/user_model"
const getUserFriendsController=(req:Request,res:Response)=>{
    const user_id = req.query.user_id

    try {
        user_model.findById(user_id).then(value=>{
            if(value !== null){
                res.status(200).json({
                    message:"succssess",
                    body:{
                        friends:value.friends
                    }
                })
            }else{
                res.status(200).json({
                    message:"user not found",
                    
                })
            }
            
        })
    } catch (error) {
        res.status(404).json({
            message:"bad request",
            
        })
    }
    

}

export default getUserFriendsController