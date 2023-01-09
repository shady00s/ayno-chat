import { Request,Response } from "express"
import user_model from "../../model/user_model"

const search_user = (req:Request,res:Response)=>{
    const contactName = req.query.contactName
    const user_id = req.query.userId

    try {
        user_model.findOne({name:contactName}).then((dataRes)=>{
            console.log(dataRes.friends);

            // check if the user found
            if(dataRes !== null){
                res.status(200).json({
                    message:"user found",
                    body: {
                        name:dataRes.name,
                        profileImagePath:dataRes.profileImagePath,

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
