import { NextFunction, Request,Response } from "express"
import user_model from "../../model/user_model"
import mongoose from "mongoose"
import Logining from "../../logger"
import conversation_model from "../../model/conversation_model"

const postAcceptFriendController = async(req:Request,res:Response,next:NextFunction)=>{
    const user_id = req.body.user_id
    const contact_id = req.body.contact_id



    // create transaction between user and contact to add each other and create conversation 
    const connecton = mongoose.connection
    let session = await connecton.startSession()

    const generatedConversationId = new mongoose.Types.ObjectId



    try {
            // check if the contact is not inside friends array
           
         user_model.findById({_id:user_id}).then(async result=>{

            if(result.friends.find((data)=> data.id == contact_id) === undefined){

                try {
                    let sessionResult = await session.withTransaction(async()=>{
                       
                        let userInformation =  await user_model.findByIdAndUpdate(user_id,
                            {$addToSet:{conversations:{conversation_Id:generatedConversationId,contact_Id:contact_id},friends:contact_id}},
                            
                            {session,new:true}).then(userValue=>{
                            return userValue
                        })
                        //remove id from friend request array
                        await user_model.findByIdAndUpdate(contact_id,{$pull:{friendRequests:user_id}})
                        let contactInformation = await user_model.findByIdAndUpdate(contact_id,{$addToSet:{conversations:{conversation_Id:generatedConversationId,contact_Id:user_id},friends:user_id}},{session,new:true}).then(contactValue =>{
                            return contactValue
                        })
            
                         await new conversation_model({conversation_name:" ",conversation_id:generatedConversationId,members_ids:[userInformation.id,contactInformation.id]}).save().then(result=>{return result })
                        res.status(200).json({
                            message:"succssess",
                           
                    })
                    })
                    if(sessionResult.ok !== 1){
                       res.status(400).json({message:"session has an error"})
                    }
                    
                } catch (error) {
                    Logining.error(error)
                    res.status(400).json({message:"session catchs an error",body:error})
                    next()
                }finally{
                    session.endSession()
                    next()
                    Logining.info("Session ended")
                }

               
            }
            else{
                res.status(500).json({message:"this contact is already your friend"})
            }
           
            
         })
        

       
        
    } catch (error) {
       
        Logining.error("There is an error")
    }
   
     
    

        


    
    

}


export default postAcceptFriendController
