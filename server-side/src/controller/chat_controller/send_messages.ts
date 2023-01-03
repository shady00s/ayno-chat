import { Request,Response } from "express"
import conversation_model from "../../model/conversation_model";
import SocketManager from './../../sockets/message_socket';

const postMessageController = (req:Request,res:Response)=>{
    const sender_id = req.body.sender_id;
    const conversation_id = req.body.conversation_id;
    const message_content = req.body.message_content;

    try {

    conversation_model.findOneAndUpdate({conversation_id:conversation_id},{$push:{messages:{message:message_content,sender_id:sender_id,}}},{new:true}).then(results=>{
        res.status(201).json({message:"succsses",body:results})
    })
    

    
    } catch (error) {
      
    }
}

export default postMessageController