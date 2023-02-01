import { Request,Response } from "express"
import user_model from "../../model/user_model";
import conversation_model from "../../model/conversation_model";

const getChatMessages= async (req:Request,res:Response)=>{
    const user_id = req.session.userData;
    let friend_id = req.query.friend_id;

    console.log(req.session);
    if(user_id !== null){
        try {
           let conversation = await user_model.findById(user_id).then(responseData=>responseData.conversations).then(val=>val)

           
           // find conversation id 

           let conversationById =  conversation.find((id)=> friend_id === id.contact_Id._id.toString())

        await conversation_model.findOne({conversation_id:conversationById.conversation_Id}).then(conversation=>{
            
            res.status(200).json({
                message:"succssess",
                conversations:conversation
            })
         })
            
        } catch (error) {
            console.log(error);
        }
        
    }else{
        res.status(204).json({
            message:"invalid username or user not found",
            
        })
    }
  
    
}

export default getChatMessages