import { Request,Response } from "express"
import user_model from "../../model/user_model"
import PasswordManager from './utils/password_manager';
const userLoginController = (req:Request,res:Response)=>{
    const userName = req.body.userName
    const password = req.body.password

    // check if the body values is not empty

    if(userName !== undefined && password !== undefined){
        user_model.findOne({name:userName}).then(userData=>{
            // check if the user is in database
    
            if(userData !== null){
                PasswordManager.decode(password,userData.password.toString()).then(isValid=>{
                    if (isValid === true){
                        res.status(200).json({
                            message:"user found",
                            user_data:{
                                id:userData._id,
                                name:userData.name,
                                profileImagePath:userData.profileImagePath
                            }
                        })
                    }
                    else{
                        res.status(200).json({
                            message:"username or password are incorrect"
                        })
                    }
            })
            }
            else{
                res.status(204).json({
                    message:"there is no user with this name"
                })
            }
    
        })
    }
    else{
        res.status(200).json({message:"username or password are corrubted please try again"})
    }
  
}

export default userLoginController