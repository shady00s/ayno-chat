import mongoose from 'mongoose';
import { conversationModel } from '../types/message_types';


const conversation_schema = new mongoose.Schema<conversationModel>({
    conversation_id:{type:mongoose.Schema.Types.ObjectId},
    media:[{type:String,default:[]}],
    messages:[ {
        message:{type:String,required:true},
        sender_id:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"UsersModel"},
        sender_image_path:{type:String,required:true},
        seen:{type:Boolean,default:false},
        delivered:{type:Boolean,default:false},
        date:{type:Date,default:Date.now()},
       
    }
    ],
    members_ids:[{type:mongoose.Schema.Types.ObjectId,required:true,ref:"UsersModel"}],
    
})

export default mongoose.model('conversation_collection',conversation_schema)