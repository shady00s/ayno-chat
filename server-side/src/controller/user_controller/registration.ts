import { NextFunction, Router,Response,Request } from "express";
import user_model from "../../model/user_model";
import Logining from './../../logger';
import PasswordManager from "./utils/password_manager";

 const userRegistrationController = (req:Request,res:Response,next:NextFunction):void=>{
   
    const userName = req.body.username;
    const password = req.body.password;
   
    const profileImagePath = req.body.profilePath;

// check if there is any body key have undefined value
    if(userName == undefined || password  == undefined ||  profileImagePath == undefined){
        res.status(204).json({message:"data is missing or corupted"})
    }
    else{
        try {
            PasswordManager.encode(password).then((hashedPassword:string)=>{
                const UserModel = new user_model({
                    name:userName,
                    password:hashedPassword,
                    profileImagePath:profileImagePath
                }) 
                UserModel.save().then((val)=>{
                    Logining.info('Added to user database')
                    res.status(201).json({
                        message:"register-complete",
                        user_body:val
                })
            })

            })
            
    }
        catch (error) {
            res.status(401).json({
                message:"register-failed",
                user_body:error
        })
        }
    }
    

    
}
   


  
 
export default userRegistrationController