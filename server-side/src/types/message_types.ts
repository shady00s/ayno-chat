import mongoose from "mongoose";

interface messageModelType{
    message:String,
    sender_id:mongoose.Types.ObjectId,
    sender_image_path:String,
    seen:Boolean,
    delivered:Boolean,
    date:Date
}
interface conversationModel{
    conversation_id:mongoose.Types.ObjectId,
    messages:Array<messageModelType>,
    members_ids:Array<mongoose.Types.ObjectId>,
    media:Array<String>
}

interface groupModel{
    conversation_name:String,
    conversation_id:mongoose.Types.ObjectId,
    messages:Array<messageModelType>,
    members_ids:Array<mongoose.Types.ObjectId>,
    media:Array<String>
}

export  {messageModelType, conversationModel,groupModel}