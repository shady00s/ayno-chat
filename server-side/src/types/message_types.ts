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
    votingData:voteModel,
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
interface colorModel{
    id:mongoose.Types.ObjectId,
    color:String,
}
interface groupModel{
    conversation_name:String,
    conversation_id:mongoose.Types.ObjectId,
    messages:Array<groupMessageModelType>,
    members_ids:Array<mongoose.Types.ObjectId>,
    media:Array<String>,
    message_colors:Array<colorModel>
    
}
interface voteModel{
    voteId:{type:mongoose.Schema.Types.ObjectId}
    voteQuestion:String,
    voteChoices:[{voteId:{type:mongoose.Types.ObjectId},voteData:{type:String}}],
    voteParticepents:[{particepentChoice:{type:String},prticipentId:{type:mongoose.Schema.Types.ObjectId}}]
}

export  {messageModelType, conversationModel,groupModel,groupMessageModelType,voteModel}