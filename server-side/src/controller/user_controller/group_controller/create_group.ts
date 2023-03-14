import { Response,Request } from "express";
import user_model from "../../../model/user_model";
import mongoose from 'mongoose';
import groups_model from "../../../model/groups_model";
import { validationResult } from 'express-validator';
import colorGenerator from "../../../utils/user_color_generator";

export default async function createGroup(req:Request,res:Response){
    const userData = req.session.userData.userId
    const groupName = req.body.groupName;
    const groupMembers = req.body.groupMembers;
    const genereatedConversationId = new mongoose.Types.ObjectId
    const allMembers = [...groupMembers,userData]
    const session = await mongoose.startSession();
    const membersColor:object[] = []
    try {
        const errors = validationResult(req)

        if(errors.isEmpty()){

                for (let index = 0; index < allMembers.length; index++) {
                    membersColor.push({id:allMembers[index],color:colorGenerator()})
                    
                }
            session.startTransaction()

        await new groups_model({conversation_id:genereatedConversationId,conversation_name:groupName,members_ids:[...allMembers],message_colors:[...membersColor]},{session:session}).save().then(data=>data)
    
         await user_model.updateMany({_id:{$in:allMembers}},{$addToSet:{groups:genereatedConversationId}},{session:session,new:true}).then(val=>val)
    
           await session.commitTransaction()

        res.status(200).json({message:"done"})
        }else{
            session.abortTransaction()
            res.status(401).json({message:"session error",errors})
        }
     
        
    } catch (error) {
        res.status(401).json({message:"error occured",error})
    }finally {
        session.endSession()
    }
}