import groups_model from '../../../model/groups_model';
import user_model from '../../../model/user_model';
import{Response,Request} from "express"

export default async function getNewMembersFromFriends(req:Request,res:Response){
     const user_id = req.session.userData.userId
     const group_id = req.query.group_id
     const friendsList =  await user_model.findById(user_id).then(userFriends=>userFriends.friends)
     const groupMembers = await groups_model.findOne({conversation_id:group_id}).then(groupsMembers=>groupsMembers.members_ids)
      const filteredFriends = []
      const remainedFriends = []
     if(friendsList!== null && groupMembers !== null){
         const friends = new Set(friendsList.map(val=>val.toString()))
         const groupMembersSet = new Set(groupMembers.map(val=>val.toString()))
         const combinedList = [...friendsList.map(val=>val.toString()),...groupMembers.map(val=>val.toString())]
         combinedList.forEach((a)=>{
            if (friends.has(a) && !groupMembersSet.has(a) && user_id.toString()!== a){
               remainedFriends.push(a)
            }
         })
       await  user_model.find({"_id":{$in:remainedFriends}}).then(val=>{
            for (let index = 0; index < val.length; index++) {
               let userData ={}

               userData['id']=val[index]._id,
               userData['name']=val[index].name,
               userData['profileImagePath']=val[index].profileImagePath,

               filteredFriends.push(userData)
            }
         })

        }
        res.status(200).json({message:"succssess",filteredFriends})
     }
