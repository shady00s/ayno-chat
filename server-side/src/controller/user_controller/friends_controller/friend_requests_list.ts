
import { Request,Response } from 'express';
import user_model from '../../../model/user_model';
import { userModel } from '../../../types/user_types';

export function friendRequestController(req:Request,res:Response){
        const user_id = req.session.userData.userId
        try {
            user_model.findById(user_id).then(async value=>{
                if(value !==null){
                    
                      
                     await  user_model.find({_id:{$in:value.friendRequests}}).select(['-password','-friends','-__v','-friendRequests','-conversations']).then(friendReqVal=>{
                       
                        
                        res.status(200).json({message:"succssess",friendRequests:friendReqVal})
                            
                       })
                        
                    
                   
                }else{
                    res.status(500).json({message:"no user found"})
                }
            })
        } catch (error) {
            res.status(500).json({message:"error occured",error})
        }
}