import { Request, Response } from "express";
import user_model from "../../../model/user_model";
import groups_model from "../../../model/groups_model";

export default function getGroupInformation(req: Request, res: Response) {
    const user_id = req.session.userData.userId;
    const conversation_id = req.query.conversation_id
    user_model.findById(user_id).then(async userData => {
        if (userData !== null) {
            // get all conversation groups (every conversation with conversation_name is group)
            try {
                // get group conversation 
              await groups_model.findOne({conversation_id:conversation_id}).select(['-_id','-__v','-messages']).then(groupVal=>{
                if(groupVal !== null){
                  
                            res.status(200).json({ message: "succssess", body:{
                                conversation_id:groupVal.conversation_id,
                                conversation_name:groupVal.conversation_name,
                                media:groupVal.media,
                                members_count:groupVal.members_ids.length
                            }})
                        }})
    
                   

                }
            


             catch (error) {
                res.status(500).json({ message: "there is error", error: error })
            }



        }
    })
}