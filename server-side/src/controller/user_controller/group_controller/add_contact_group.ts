import { Request,Response } from "express";
import groups_model from "../../../model/groups_model";
import { validationResult } from "express-validator";
import mongoose from "mongoose";
import user_model from "../../../model/user_model";
import colorGenerator from './../../../utils/user_color_generator';

export default async function addContactToGroup(req:Request,res:Response){

    const conversation_id = req.body.conversation_id
    const newContactList = req.body.new_contact_list
    const errors = validationResult(req)

        const contactsWithColors = newContactList.map(val=>({id:val, color:colorGenerator()}))
    
    try {
        if(errors.isEmpty()){
            const session = await mongoose.startSession()
             session.startTransaction()
          let groupData = await groups_model.findOneAndUpdate({conversation_id:conversation_id},{$addToSet:{members_ids:{$each:[...newContactList]},message_colors:{$each:contactsWithColors}}},{new:true}).session(session)

            await user_model.updateMany({_id:{$in:newContactList}},{$addToSet:{groups:conversation_id}}).session(session)
    
            await session.commitTransaction().then(val=>{
                if(val.ok ===1){
                    res.status(201).json({message:"succsses",groupData})

                }
            })
        }else{
            res.status(500).json({message:"error",errors})
    
        }
    } catch (error) {
        res.status(500).json({message:"error occured",error})

    }
    


}