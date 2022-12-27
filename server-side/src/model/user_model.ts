import mongoose from 'mongoose';


interface userModel{
    name:String,
    password:String,
    profileImagePath:String,
    conversations:Array<mongoose.Types.ObjectId>,
    friends:Array<String>,    
}
const user_schema = new mongoose.Schema<userModel>({
   name:{type:String,required:true},
   password:{type:String,required:true},
   profileImagePath:{type:String,required:true},
   conversations:[{conversation_Id:{type:mongoose.Schema.Types.ObjectId,required:true},contact_Id:{type:mongoose.Schema.Types.ObjectId,required:true, ref:"userModel"}}],
    friends:[{type:mongoose.Schema.Types.ObjectId,required:true, ref:"userModel"}]
})

export default mongoose.model('userModel',user_schema)