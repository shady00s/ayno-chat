import { Request, Response } from "express"
import user_model from "../../model/user_model"
import { validationResult } from 'express-validator';

const search_user = async(req: Request, res: Response) => {
    const contactName = req.query.contactName
    const user_id = req.session.userData.userId

    const errors = validationResult(req)
    if (errors.isEmpty()) {


        const userData =   await user_model.findById(user_id).select(['-password','-name','-_id','-groups','-profileImagePath']).then(val=>val)
        const contactData = await user_model.findOne({name: new RegExp('^'+ contactName +'$','i')}).select(['-password','-groups']).then(val=>val)
        const userFriendList = new Set(userData.friends.map(val=>val.toString()))
        const userConversationsList = new Set(userData.conversations)
        const contactFriendRequests = new Set(contactData.friendRequests.map(val=>val.toString()))
        res.status(200).json({message:'user found',body:{
            id:contactData._id,
            name:contactData.name,
            profileImagePath:contactData.profileImagePath,
            isFriend:userFriendList.has(contactData._id.toString()),
            isInFriendRequests:contactFriendRequests.has(user_id.toString()),
            conversation_id:userFriendList.has(contactData._id.toString()) ? [...userConversationsList].filter(a=>a.contact_Id.equals(contactData._id))
            :undefined
        }})
    } else {
        res.status(500).json({ message: "there is an error", errors })
    }

}

export default search_user
