import groups_model from '../../../model/groups_model';
import user_model from '../../../model/user_model';
import{Response,Request} from "express"

export default async function getNewMembersFromFriends(req:Request,res:Response){
    const user_id = req.session.userData.userId
    const group_id = req.body.groupValidator
     const friendsList =  new Set(await user_model.findById(user_id).then(userFriends=>userFriends.friends))
     const groupMembers = new Set(await groups_model.findOne({conversation_id:group_id}).then(groupsMembers=>groupsMembers.members_ids))

     if(friendsList!== null && groupMembers !== null){
        const result = new Set([...friendsList].filter(result=> !groupMembers.has(result)))

        res.status(200).json({message:"succssess",result})
     }
}