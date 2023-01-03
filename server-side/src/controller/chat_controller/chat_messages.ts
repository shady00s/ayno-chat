import { Request,Response } from "express"
import user_model from "../../model/user_model";
import conversation_model from "../../model/conversation_model";

const getChatMessages= async (req:Request,res:Response)=>{
    const user_id = req.query.user_id;
    let friend_id = req.query.friend_id;

    if(user_id !== null){
        try {
           let conversation = await user_model.findById(user_id).then(responseData=>responseData.conversations)

           
           // find conversation id 

         let conversation_id =  conversation.find((id)=> friend_id === id.contact_Id._id.toString())

         conversation_model.findOne({conversation_id:conversation_id.conversation_Id}).then(conversation=>{

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