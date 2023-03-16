import { Request,Response } from "express"
import user_model from "../../model/user_model"
import mongoose from 'mongoose';

const search_user = (req:Request,res:Response)=>{
    const contactName = req.query.contactName
    const user_id = req.session.userData.userId
    let isFriend:boolean = false ;
    let conversation_id :mongoose.Types.ObjectId;
    try {
        user_model.findOne({name:new RegExp('^'+contactName+'$', "i")}).select(["-password",'-messages','-groups']).then(async(searchResult)=>{

            // check if the user found
            if(searchResult !== null){
               let userFriends = await user_model.findById(user_id).select(["-password",'-messages','-groups']).then(friendsData=>friendsData)

                for (let index = 0; index < userFriends.friends.length; index++) {
                    if(userFriends.friends[index].equals(searchResult.id)){
                        isFriend = true
                    }
                   
                }
                if(isFriend === true){
                    for (let index = 0; index < userFriends.conversations.length; index++) {
                        
                        if(userFriends.conversations[index].contact_Id.equals(searchResult.id)){
                            conversation_id = userFriends.conversations[index].conversation_Id
                        }
                        
                    }
                    res.status(200).json({
                        message:"user found",
                        body: {
                            id:searchResult.id,
                            name:searchResult.name,
                            profileImagePath:searchResult.profileImagePath,
                            isFriend,
                            conversation_id
                        }
                    })
                }else{
                    res.status(200).json({
                        message:"user found",
                        body: {
                            id:searchResult.id,
                            name:searchResult.name,
                            profileImagePath:searchResult.profileImagePath,
                            isFriend,
                        }
                    })
                
            }
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
