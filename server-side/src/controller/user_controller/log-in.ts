import { Request,Response } from "express"
import user_model from "../../model/user_model"

const userLogin = (req:Request,res:Response)=>{
    const user_name = req.body.username
    const user_password = req.body.user_password
    
    // check if the user 
}

export default userLogin