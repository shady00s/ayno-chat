
import { Request,Response } from 'express';
import user_model from '../../../model/user_model';
import groups_model from '../../../model/groups_model';

export default function getGroups(req:Request,res:Response){
    const user_id = req.session.userData.userId
    // get groups
    user_model.findById(user_id).then(userData=>{
        if(userData !==null){
 const groups:string[] = []
        for (let index = 0; index < userData.groups.length; index++) {

            let ids = userData.groups[index]._id.toString();
            groups.push(ids)
            
        }
        if(userData !== null){
            groups_model.find({conversation_id:{$in:[...groups]}}).select(['-messages','-media']).then(groups=>{
                if(groups !== null){
                    res.status(200).json({message:"succssess",body:groups})
                }
            })
        }
        }
       
    })
}