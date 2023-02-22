import { Request,Response } from "express"
import user_model from "../../model/user_model"
const getUserFriendsController=(req:Request,res:Response)=>{
   const user_id = req.session.userData.userId
  
    try {
        if(user_id !== undefined){
            user_model.findById(user_id).then(async value=>{
                if(value !== null){
                     let friendData = await user_model.find({"_id":{$in : value.friends,},"conversations.contactID": user_id}).select(['-password','-friendRequests','-friends','-__v']).then(val=>val)
                      
                     
                    res.status(200).json({
                        message:"succssess",
                        body:{
                            friends:friendData,

                        }
                    })
                }else{
                    res.status(200).json({
                        message:"user not found",
                        
                    })
                }
                
            })

        }
        else{
            res.status(500).json({message:"user_id is corrupted"})
        }
    } catch (error) {
        res.status(404).json({
            message:"bad request",
            
        })
    }
    

}

export default getUserFriendsController