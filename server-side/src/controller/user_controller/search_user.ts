import { Request,Response } from "express"
import user_model from "../../model/user_model"

const search_user = (req:Request,res:Response)=>{
    const contactName = req.query.contactName
    const user_id = req.session.userData.userId
    let isFriend:boolean = false ;
    try {
        user_model.findOne({name:new RegExp('^'+contactName+'$', "i")}).then(async(dataRes)=>{

            // check if the user found
            if(dataRes !== null){
               let userFriends = await user_model.findById(user_id).then(friends=>friends.friends)

                for (let index = 0; index < userFriends.length; index++) {
                   if(userFriends[index].toString() === dataRes.id) isFriend = true
                }
                res.status(200).json({
                    message:"user found",
                    body: {
                        id:dataRes.id,
                        name:dataRes.name,
                        profileImagePath:dataRes.profileImagePath,
                        isFriend
                    }
                })
            }
            else{
                res.status(204).json({
                    message:"user not found"
                })
            }
            
                
        })  
    } catch (error) {
        res.status(400).json({
            message:"error",
                    body: error
        })
    }
 
}

export default search_user
