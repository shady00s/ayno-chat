import mongoose from 'mongoose';
interface userModel{
    name:String,
    password:String,
    profileImagePath:String,
    friends:mongoose.Types.Array<mongoose.Types.ObjectId>,
    conversations:mongoose.Types.Array<mongoose.Types.ObjectId>,    
}
const user_schema = new mongoose.Schema<userModel>({
   name:{type:String,required:true},
   password:{type:String,required:true},
   profileImagePath:{type:String,required:true},
   conversations:[{type:mongoose.Schema.Types.ObjectId,required:true ,ref:"conversationModel"}],
   friends:[{type:mongoose.Schema.Types.ObjectId,required:true, ref:"userModel"}],
})

export default mongoose.model('userModel',user_schema)