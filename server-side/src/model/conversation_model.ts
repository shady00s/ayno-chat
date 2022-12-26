import mongoose from 'mongoose';

interface messageModel{
    message:String,
    sender_id:mongoose.Types.ObjectId,
    seen:Boolean,
    delivered:Boolean,
    date:Date
}
interface conversationModel{
    conversation_id:mongoose.Types.ObjectId,
    conversation_name:String,
    messages:Array<messageModel>,
    members_ids:mongoose.Types.ObjectId,
}
const conversation_schema = new mongoose.Schema<conversationModel>({
    conversation_id:{type:mongoose.Schema.Types.ObjectId},
    conversation_name:{type:String,required:true},
    messages:[ {
        message:{type:String,required:true},
        sender_id:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"UsersModel"},
        seen:{type:Boolean,default:false},
        delivered:{type:Boolean,default:false},
        date:{type:Date,default:Date.now()}
    }
    ],
    members_ids:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"UsersModel"},
    
})

export default mongoose.model('conversationModel',conversation_schema)