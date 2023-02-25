import { Request,Response } from "express"
import conversation_model from "../../model/conversation_model";
import {socketManager } from "../../sockets/socket_manager";

const postMessageController = (req:Request,res:Response)=>{
    const sender_id = req.session.userData.userId;
    const conversation_id = req.body.conversation_id;
    const message_content = req.body.message_content;
    try {
    
     

    conversation_model.findOneAndUpdate({conversation_id:conversation_id},{$push:{messages:{message:message_content,sender_id:sender_id,sender_image_path:req.session.userData.userProfilePath}}},{new:true}).then(results=>{
        res.status(201).json({message:"succsses",body:results})
     
    })
    

    
    } catch (error) {
        res.status(500).json({message:"error occured",error})

    }
}

export default postMessageController