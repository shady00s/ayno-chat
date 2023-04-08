import { Response,Request } from "express";
import user_model from "../../../model/user_model";
import { validationResult } from 'express-validator';

const addFriendRequestController = (req:Request,res:Response)=>{
    const friend_id = req.body.friend_id
    const user_id = req.session.userData.userId
    // check if the id is not empty 
    const errors = validationResult(req)
    if(errors.isEmpty()){

try {
    user_model.findById(user_id).then(async user=>{
        if(user !== null){
            
           user_model.findByIdAndUpdate({_id:friend_id},{$addToSet:{friendRequests:user_id}},{new:true}).then(friend_data=>{
               if( friend_data !==null){
             
                res.status(200).json({message: "succsses , request was sent."})
               }else{
                res.status(500).json({message: "friend is already existed"})

               }

           })
        }
        else{
            res.status(500).json({message: "the user id is not found",})
        }
    })  
} catch (error) {
    res.status(500).json({message: "error occured",error})
}
       
    }
    else{
        res.status(500).json({message: "there is error with user id or contact id",})
    }

             

}

export default addFriendRequestController


