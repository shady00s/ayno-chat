import mongoose from "mongoose";

interface messageModelType{
    message:String,
    sender_id:mongoose.Types.ObjectId,
    seen:Boolean,
    delivered:Boolean,
    date:Date
}
interface conversationModel{
    conversation_id:mongoose.Types.ObjectId,
    conversation_name:String,
    messages:Array<messageModelType>,
    members_ids:Array<mongoose.Types.ObjectId>,
}

export  {messageModelType, conversationModel}