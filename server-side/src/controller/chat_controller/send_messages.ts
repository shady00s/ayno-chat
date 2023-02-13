import { Request,Response } from "express"
import conversation_model from "../../model/conversation_model";

const postMessageController = (req:Request,res:Response)=>{
    const sender_id = req.session.userData.userId;
    const conversation_id = req.body.conversation_id;
    const message_content = req.body.message_content;
    const sender_image = req.body.imagePath;

    try {

    conversation_model.findOneAndUpdate({conversation_id:conversation_id},{$push:{messages:{message:message_content,sender_id:sender_id,sender_image_path:sender_image}}},{new:true}).then(results=>{
        
        res.status(201).json({message:"succsses",body:results})
    })
    

    
    } catch (error) {
      
    }
}

export default postMessageController