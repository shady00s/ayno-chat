import mongoose from "mongoose";

interface conversation{
    conversation_Id:mongoose.Types.ObjectId,
    contact_Id:mongoose.Types.ObjectId
}

interface friendsModel{
    name:String,
    friendId:mongoose.Types.ObjectId,
    profilePath:String
}

interface userModel{
    name:String,
    password:String,
    profileImagePath:String,
    conversations:Array<conversation>,
    friends:Array<friendsModel>,    
}

export  {conversation,userModel,friendsModel}