import { NextFunction, Request,Response } from "express"
import user_model from "../../model/user_model"
import mongoose,{ObjectId} from "mongoose"
import Logining from "../../logger"
import conversation_model from "../../model/conversation_model"
import { friendsModel } from "../../types/user_types"

const postAddFriendController = async(req:Request,res:Response,next:NextFunction)=>{
    const user_id = req.query.user_id
    const contact_id = req.query.contact_id


    // create transaction between user and contact to add each other and create conversation 
    const connecton = mongoose.connection
    let session = await connecton.startSession()

    const generatedConversationId = new mongoose.Types.ObjectId



    try {
        //let contentID = new mongoose.mongo.ObjectId(contact_id.toString()) 
            // check if the contact is not inside friends array
           
         user_model.findById({_id:user_id}).then(async result=>{

            if(result.friends.find((data:friendsModel)=> data.friendId.id.toString() == contact_id) === undefined){

                try {
                    let sessionResult = await session.withTransaction(async()=>{
                        let userInformation =  await user_model.findByIdAndUpdate(user_id,
                            
                            {$addToSet:{conversations:{conversation_Id:generatedConversationId,contact_Id:contact_id},friends:contact_id}},
                            
                            {session,new:true}).then(userValue=>{
                            return userValue
                        })
            
                        //{$addToSet:{conversations:generatedConversationId,friends:user_id}},
            
                        let contactInformation = await user_model.findByIdAndUpdate(contact_id,{$addToSet:{conversations:{conversation_Id:generatedConversationId,contact_Id:user_id},friends:user_id}},{session,new:true}).then(contactValue =>{
                            return contactValue
                        })
            
                        let createConversation = await new conversation_model({conversation_name:" ",conversation_id:generatedConversationId,members_ids:[userInformation.id,contactInformation.id]}).save().then(result=>{return result })
                        res.status(200).json({
                            message:"succssess",
                            body:{userData :{conv:userInformation.conversations , friends:userInformation.friends}  ,
                            
                            contactData : {conv:contactInformation.conversations ,friends:createConversation}  ,}
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
            else{
                res.status(500).json({message:"this contact is already your friend"})
            }
           
            
         })
        

       
        
    } catch (error) {
       
        Logining.error("There is an error")
    }
   
     
    

        


    
    

}


export default postAddFriendController
