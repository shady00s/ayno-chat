import { Request,Response } from "express";
import groups_model from "../../../model/groups_model";
import user_model from "../../../model/user_model";
import { validationResult } from 'express-validator';

export default function getGroupContacts(req:Request,res:Response){
    const user_id = req.session.userData.userId;
    const group_id = req.query.groupId
    const errors = validationResult(req)

    
    if(errors.isEmpty()){
               // groups_model.findOne({conversation_id:group_id}).then(async group=>{
                // if(group !==null){
                //          const contacts:string[] = []
                //     for (let index = 0; index < group.members_ids.length; index++) {
            
                        
                //         if(group.members_ids[index]._id.equals(user_id)) continue
                //         contacts.push(group.members_ids[index]._id.toString())
                        
                //     }
                //     const userFriends = await user_model.findById(user_id).then(data=>data.friends)
                //    await user_model.find({_id:{$in:[...contacts]}},).select(['-conversations','-password','-friends','-friendRequests','-groups' ]).then(users=>{
                //         if(users!==null){
                //             for (let index = 0; index < userFriends.length; index++) {
                //                for (let index2 = 0; index2 < users.length; index2++) {
                                
                //                }
                                
                //             }
                //             res.status(200).json({message:"succssess",body:users})
                //         }
                //     })
                // }

                

            //})


            groups_model.aggregate([
                {$lookup:{
                    from:'usermodels',
                    localField:"friends",
                    foreignField:"members_ids"
                    ,as:"groupContacts"
                }},
                
                {$project:{
                    "_id":1,
                    "groupContacts":{$filter:{
                        input:"$groupContacts",
                        as:"groupContact",
                        cond:{$not:{$in:[user_id,"$$groupContact"]}} 
                    }}

                }}
            ]).then(val=>{
                res.status(200).json({message:"succssess",body:val})
            })
            }else{
                res.status(500).json({message:"there is an error",errors})
            }
}