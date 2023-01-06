import { Request,Response } from "express"
import user_model from "../../model/user_model"
const getUserFriendsController=(req:Request,res:Response)=>{
    const user_id = req.query.user_id
    let friendsList = []
    try {
        user_model.findById(user_id).then(async value=>{
            if(value !== null){
                for(var x = 0;x < value.friends.length;x++){
                 let friendData = await  user_model.findById(value.friends[x]).then(friendReq=>friendReq)

                 friendsList.push({name:friendData.name,friendId:friendData.id,profilePath:friendData.profileImagePath })
                }
                
                res.status(200).json({
                    message:"succssess",
                    body:{
                        friends:friendsList
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