import { Request,Response } from "express";
import groups_model from "../../../model/groups_model";
import { validationResult } from "express-validator";

export default function addContactToGroup(req:Request,res:Response){

    const conversation_id = req.body.conversation_id
    const newContactList = req.body.new_contact_list
    const errors = validationResult(req)
    

    if(errors.isEmpty()){
        groups_model.findOneAndUpdate({conversation_id:conversation_id},{$addToSet:{members_ids:{$each:[...newContactList]}}},{new:true}).then(val=>{
            if(val !== null){
                res.status(201).json({message:"succsses",val})
            }
        })

    }else{
        res.status(500).json({message:"error",errors})

    }


}