import { Request,Response } from "express";
import groups_model from "../../model/groups_model";
import user_model from "../../model/user_model";

export default function getGroupContacts(req:Request,res:Response){
    const user_id = req.session.userData.userId;
    const group_id = req.query.groupId
        groups_model.findOne({conversation_id:group_id}).then(async group=>{
            if(group !==null){
                     const contacts:string[] = []
                for (let index = 0; index < group.members_ids.length; index++) {
        
                    let ids = group.members_ids[index]._id.toString();
                    
                    if(ids === user_id.toString()) continue
                    contacts.push(ids)
                    
                }
               await user_model.find({_id:{$in:[...contacts]},"conversations.contactID":user_id}).select(['-password','-friends','-friendRequests','-groups' ]).then(users=>{
                    if(users!==null){
                        res.status(200).json({message:"succssess",body:users})
                    }
                })
            }
        })
}