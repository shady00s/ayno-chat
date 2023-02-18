import mongoose from "mongoose";
import { groupModel } from "../types/message_types";


const groups_model = new mongoose.Schema<groupModel>({
    conversation_id:{type:mongoose.Schema.Types.ObjectId},
    conversation_name:{type:String,required:true},
    media:[{type:String,default:[]}],
    members_ids:[{type:mongoose.Schema.Types.ObjectId,required:true,ref:"UsersModel"}],
    messages:[ {
        message:{type:String,required:true},
        sender_id:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"UsersModel"},
        sender_image_path:{type:String,required:true},
        seen:{type:Boolean,default:false},
        delivered:{type:Boolean,default:false},
        date:{type:Date,default:Date.now()},
       
    }]
})

export default mongoose.model('groups_collection',groups_model)