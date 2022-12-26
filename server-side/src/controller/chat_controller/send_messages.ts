import { Request,Response } from "express"
import user_model from "../../model/user_model";
import conversation_model from "../../model/conversation_model";

const postMessageController = (req:Request,res:Response)=>{
    const contactName = req.params.user_name;
    const sender_id = req.query.sender_id;
  conversation_model.findOne
}

export default postMessageController