import { Request,Response } from 'express';
import { store } from '../../server';

export default function logOutController (req:Request,res:Response){
    const user_session_id = req.sessionID
    
    store.destroy(user_session_id,(error)=>{
        if(error){
            res.status(400).json({message:"there is an error with session",error})
        }else{
            store.destroy(user_session_id,(err)=>{
                if(err){
                    res.status(501).json({message:"There is an error",err})

                }else{
                    res.status(201).json({message:"logout-successfully"})

                }
            })
        }
    })
}