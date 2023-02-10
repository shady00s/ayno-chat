
import { Request,Response } from 'express';
import user_model from '../../model/user_model';

export function friendRequestController(req:Request,res:Response){
        const user_id = req.session.userData.userId

        try {
            user_model.findById(user_id).then(value=>{
                if(value !==null){
                    res.status(200).json({message:"succssess",friendRequests:value.friendRequests})
                }else{
                    res.status(500).json({message:"no user found"})
                }
            })
        } catch (error) {
            res.status(500).json({message:"error occured",error})
        }
}