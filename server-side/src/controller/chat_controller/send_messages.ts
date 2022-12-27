import { Request,Response } from "express"
import user_model from "../../model/user_model";
import conversation_model from "../../model/conversation_model";

const postMessageController = (req:Request,res:Response)=>{
    const resiver_id = req.params.user_name;
    const sender_id = req.query.sender_id;

    try {
      
    user_model.findById(sender_id).then(sendResult=>{
          sendResult.conversations
    })
  
    

    
    } catch (error) {
      
    }
}

export default postMessageController