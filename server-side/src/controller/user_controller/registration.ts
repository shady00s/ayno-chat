import { NextFunction, Router,Response,Request } from "express";
import user_model from "../../model/user_model";
import Logining from '../../utils/logger';
import PasswordManager from "../../utils/managers/password_manager";
import { validationResult } from 'express-validator';
import { store } from '../../server';
 const userRegistrationController = (req:Request ,res:Response,next:NextFunction):void=>{
   
    const userName = req.body.username;
    const password = req.body.password;
    const profileImagePath = req.body.profilePath;
    const errors = validationResult(req)
// check if there is any body key have undefined value
    if(!errors.isEmpty()){
        res.status(204).json({message:"data is missing or corupted",errors})
    }
    else{
        try {


            user_model.findOne({name:userName}).then(valData=>{
                if(valData !==null){
                    res.status(200).json({message:`there is already user with name ${userName}`})
                }
                else{
                    PasswordManager.encode(password).then((hashedPassword:string)=>{
                        const UserModel = new user_model({
                            name:userName,
                            password:hashedPassword,
                            profileImagePath:profileImagePath
                        }) 
                        UserModel.save().then((val)=>{
        
                            req.session.userData={
                                userId:val.id ,
                                userName:val.name,
                                userProfilePath:val.profileImagePath
                              }
                              req.session.save(function(err){
                                if(err){
                                  res.status(400).json({message:"session err",err:err})
                                 
                                }
                                else{
                                  res.redirect('/user/loginAuth')
                
                                }
                               
                              
                              });
        
                            Logining.info('Added to user database')
                            res.status(201).json({
                                message:"register-complete",
                                body:{name:val.name,profileImagePath:val.profileImagePath}
                        })
                    })
        
                    })
                }
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