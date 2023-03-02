import mongoose from "mongoose";

interface messageModelType{
    message:String,
    sender_id:mongoose.Types.ObjectId,
    sender_image_path:String,
    seen:Boolean,
    delivered:Boolean,
    date:Date
}

interface groupMessageModelType{
    vote:voteModel,
    message:String,
    sender_id:mongoose.Types.ObjectId,
    sender_image_path:String,
    seen:Boolean,
    delivered:Boolean,
    date:Date,
    sender_name:String,
    type:String
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
    messages:Array<groupMessageModelType>,
    members_ids:Array<mongoose.Types.ObjectId>,
    media:Array<String>
    
}
interface voteModel{
    voteCreator:{creatorName:String,creatorProfilePath:String},
    voteQuestion:String,
    voteChoices:[{voteId:{type:mongoose.Types.ObjectId},voteData:{type:String}}],
    voteParticepents:[{particepentChoice:{type:String},prticipentId:{type:mongoose.Schema.Types.ObjectId}}]
}

export  {messageModelType, conversationModel,groupModel,groupMessageModelType,voteModel}