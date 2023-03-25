import groups_model from '../../../model/groups_model';
import user_model from '../../../model/user_model';
import{Response,Request} from "express"

export default async function getNewMembersFromFriends(req:Request,res:Response){
     const user_id = req.session.userData.userId
     const group_id = req.body.groupValidator
     const friendsList =  await user_model.findById(user_id).then(userFriends=>userFriends.friends)
     const groupMembers = await groups_model.findOne({conversation_id:group_id}).then(groupsMembers=>groupsMembers.members_ids)
      const filteredFriends = []
     if(friendsList!== null && groupMembers !== null){
        for (let index = 0; index < friendsList.length; index++) {
            for (let index2 = 0; index2 < groupMembers.length; index2++) {
               if(!friendsList[index]._id.equals(groupMembers[index2]._id)){
                  filteredFriends.push(friendsList[index])
               }
               
            }
        }
        res.status(200).json({message:"succssess",filteredFriends})
     }
}