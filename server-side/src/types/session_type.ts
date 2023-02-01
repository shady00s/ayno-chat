import mongoose from 'mongoose';
class UserData {
    userId:mongoose.Types.ObjectId
    userName:String
    userProfilePath:String
    
}


export default UserData