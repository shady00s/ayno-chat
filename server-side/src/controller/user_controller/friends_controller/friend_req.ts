import { Response,Request } from "express";
import user_model from "../../../model/user_model";
import {socketManager} from '../../../sockets/socket_manager';

const addFriendRequestController = (req:Request,res:Response)=>{
    const friend_id = req.body.friend_id
    const user_id = req.session.userData.userId
    // check if the id is not empty 
    if(friend_id !== undefined && user_id !== undefined){

try {
    user_model.findById(user_id).then(async user=>{
        if(user !== null){
            
           let friend_data = await user_model.findByIdAndUpdate(friend_id,{$addToSet:{friendRequests:user_id}}).then(val=>val)
           if( friend_data !==null){
          //  SocketManager.friendRequestSocket({name:friend_data.name,profileImage:friend_data.profileImagePath})
           // socketManager.friendRequest({name:user.name,profileImage:user.profileImagePath})
            res.status(200).json({message: "succsses , request was sent."})
           }
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


