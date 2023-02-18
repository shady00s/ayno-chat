import mongoose from 'mongoose';
import { userModel } from '../types/user_types';

const user_schema = new mongoose.Schema<userModel>({
   name:{type:String,required:true},
   password:{type:String,required:true},
   profileImagePath:{type:String,required:true},
   conversations:[{conversation_Id:{type:mongoose.Schema.Types.ObjectId,required:true},contact_Id:{type:mongoose.Schema.Types.ObjectId, ref:"userModel"}}],
    friends:[{type:mongoose.Schema.Types.ObjectId,required:true, ref:"userModel"}],
    friendRequests:[{type:mongoose.Schema.Types.ObjectId,required:true,ref:"userModel"}]
})

export default mongoose.model('userModel',user_schema)