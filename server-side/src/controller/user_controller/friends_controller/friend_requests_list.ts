
import { Request,Response } from 'express';
import user_model from '../../../model/user_model';
import { userModel } from '../../../types/user_types';

export function friendRequestController(req:Request,res:Response){
        const user_id = req.session.userData.userId
        const friendRequestList:userModel[] = [];
        try {
            user_model.findById(user_id).then(async value=>{
                if(value !==null){
                    for (let index = 0; index < value.friendRequests.length; index++) {
                      
                     await  user_model.findById({_id:value.friendRequests[index]}).select(['-password','-friends','-__v','-friendRequests','-conversations']).then(friendReqVal=>{
                        // check if there is currpted user_id then remove it from list
                       
                        if(friendReqVal !== null){
                            friendRequestList.push(friendReqVal)
                        }
                            
                       })
                        
                    }
                   
                    res.status(200).json({message:"succssess",friendRequests:friendRequestList})
                }else{
                    res.status(500).json({message:"no user found"})
                }
            })
        } catch (error) {
            res.status(500).json({message:"error occured",error})
        }
}