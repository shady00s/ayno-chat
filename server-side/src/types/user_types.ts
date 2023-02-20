import mongoose from "mongoose";

interface conversation{
    conversation_Id:mongoose.Types.ObjectId,
    contact_Id:mongoose.Types.ObjectId
}


interface userModel{
    name:String,
    password:String,
    profileImagePath:String,
    conversations:Array<conversation>,
    friends:Array<mongoose.Types.ObjectId>,    
    groups:Array<mongoose.Types.ObjectId>,    
    friendRequests:Array<mongoose.Types.ObjectId>,    
}

export  {conversation,userModel}