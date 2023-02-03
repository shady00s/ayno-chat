import { Response,Request } from "express";
import user_model from "../../model/user_model";

const addFriendRequestController = (req:Request,res:Response)=>{
    const friend_id = req.body.friend_id
    const user_id = req.body.user_id

    console.log(friend_id);
    // check if the id is not empty 
    if(friend_id !== undefined && user_id !== undefined){


        user_model.findById(friend_id).then(async friend=>{
            if(friend !== null){
               let friend_data = await user_model.findByIdAndUpdate(friend_id,{$addToSet:{friendRequests:user_id}}).then(val=>val)
               if( friend_data !==null){
                res.json({message: "succsses , request was sent."})
               }
            }
            else{
                res.json({message: "the user id is not found",})
            }
        })
    }
    else{
        res.status(500).json({message: "there is error with user id or contact id",})
    }

             

}

export default addFriendRequestController