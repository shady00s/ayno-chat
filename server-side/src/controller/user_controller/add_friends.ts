import { NextFunction, Request,Response } from "express"
import user_model from "../../model/user_model"
import mongoose from "mongoose"
import Logining from "../../logger"

const postAddFriendController = async(req:Request,res:Response,next:NextFunction)=>{
    const user_id = req.query.user_id
    const contact_id = req.query.contact_id


    // create transaction between user and contact to add each other 
    const connecton = mongoose.connection
    let session = await connecton.startSession()

    
    try {
        
        let sessionResult = await session.withTransaction(async()=>{
            let userInformation =  await user_model.findByIdAndUpdate( user_id,{$addToSet: {friends : contact_id}} ,{session,new:true}).then(userValue=>{
                return userValue
            })

            let contactInformation = await user_model.findByIdAndUpdate(contact_id,{$addToSet: {friends : user_id}},{session,new:true}).then(contactValue =>{
                return contactValue
            })

            res.status(200).json({
                message:"succssess",
                body:{userData : userInformation.friends , contactData : contactInformation.friends }
        })
        })
        if(sessionResult.ok !== 1){
           res.status(400).json({message:"session has an error"})
        }

        
    } catch (error) {
        Logining.error(error)
        res.status(400).json({message:"session catchs an error",body:error})

    }finally{
        session.endSession()
        next()
        Logining.info("Session ended")
    }
    
   
     
    

        


    
    

}


export default postAddFriendController
