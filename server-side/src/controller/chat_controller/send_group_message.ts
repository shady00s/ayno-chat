
import { Response, Request } from 'express';
import groups_model from '../../model/groups_model';
import { socketManager } from '../../sockets/socket_manager';
export default function sendGroupMessage(req:Request,res:Response){
    const group_id = req.body.conversation_id
    const message_content = req.body.message_content
    const sender_id = req.session.userData.userId
    const sender_image_path = req.body.sender_image_path
    const sender_name = req.body.sender_name

    socketManager.groupSendMessageSocket(group_id,{
        conversation_id:group_id,
        sender_id,
        sender_image_path,
        sender_name,
        message:message_content})
    groups_model.findOneAndUpdate({conversation_id:group_id},{$push:{messages:{message:message_content,sender_id:sender_id,sender_image_path:sender_image_path,sender_name:sender_name}}},{new:true}).then(val=>{
        res.status(200).json({message:"succssess",body:val})
    }
    )
}