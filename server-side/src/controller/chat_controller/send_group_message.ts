
import { Response, Request } from 'express';
import groups_model from '../../model/groups_model';
export default function sendGroupMessage(req:Request,res:Response){
    const group_id = req.body.conversation_id
    const message_content = req.body.message_content
    const sender_id = req.session.userData.userId
    const sender_image_path = req.body.sender_image_path

    groups_model.findOneAndUpdate({conversation_id:group_id},{$push:{messages:{message:message_content,sender_id:sender_id,sender_image_path:sender_image_path}}},{new:true}).then(val=>{
        res.status(200).json({message:"succssess",body:val})
    }
    )
}