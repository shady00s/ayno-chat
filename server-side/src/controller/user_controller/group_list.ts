import { Request, Response } from "express";
import user_model from "../../model/user_model";
import conversation_model from "../../model/conversation_model";
import { conversationModel } from "../../types/message_types";
import groups_model from "../../model/groups_model";

export default function getGroupList(req: Request, res: Response) {
    const user_id = req.session.userData.userId;
    const conversation_id = req.query.conversation_id
    user_model.findById(user_id).then(async userData => {
        if (userData !== null) {
            // get all conversation groups (every conversation with conversation_name is group)
            try {
                // for (let index = 0; index < userData.conversations.length; index++) {
                //     await conversation_model.find({
                //         $and: [{ conversation_id: userData.conversations[index].conversation_Id }, { conversation_name: { $nin: [" "] } }]
                //     }).select(['-messages','-media','-_id','-__v']).then(val => {
                //         if (val !== null) {

                //             conversations.push(...val)
                //         }

                //     })
                // }

                // get group conversation 
              await groups_model.findOne({conversation_id:conversation_id}).then(groupVal=>{
                if(groupVal !== null){
                    user_model.find({_id:{$in:groupVal.members_ids}}).select(['-password','-conversations','-friendRequests','-friends']).then(usersVal=>{
                        if(usersVal!==null){

                            res.status(200).json({ message: "succssess", data:{groupVal,usersVal} })
                        }
    
                    })

                }
              })


            } catch (error) {
                res.status(500).json({ message: "there is error", error: error })
            }



        }
    })
}