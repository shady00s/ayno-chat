import { Request,Response } from "express"
import user_model from "../../model/user_model"

export default function ignoreFriendRequest(req:Request,res:Response){

    const user_id = req.session.userData.userId
    const friend_id = req.query.friend_id

        if(friend_id !==""){
                try {
                    user_model.findByIdAndUpdate(user_id,{$pull:{friendRequests:friend_id}},{new:true}).then(userData=>{
                        if(userData !==null){
                            res.status(201).json({message:"request removed",userData:userData.friendRequests})
                        }

                    })
                } catch (error) {
                    
                }
        }else{
            res.status(500).json({message:"friend id is not found"})
        }

    
}