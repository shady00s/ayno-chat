import { NextFunction, Request,Response } from "express"
import user_model from "../../model/user_model"
import PasswordManager from './utils/password_manager';



const userLogin = (req:Request,res:Response,next:NextFunction)=>{

    const user_name = req.body.user_name
    const user_password = req.body.user_password

    if(user_name !== undefined && user_password !== undefined)
    try{
        user_model.findOne({name:user_name}).then(async userVal=>{
          if(userVal!== null){
           
            
            let isValidated:boolean = await  PasswordManager.decode(user_password,userVal.password.toString())
  
            if(isValidated){


              req.session.userData={
                userId:userVal.id ,
                userName:userVal.name,
                userProfilePath:userVal.profileImagePath
              }
             
              req.session.save(function(error){
                if(error){
                  res.status(400).json({message:"session error",error})
                 
                }
                  req.session.save(function(err){
                    if(err){
                      res.status(500).json({message:"session error",err})
                    }
                    else{
                      res.redirect('/user/loginAuth')

                    }
                  })
               
              
              });
              
             
              
            }
          else{
            res.status(500).json({message:`there is no account with name ${user_name}`})
          }
        }})

    }catch(error){}
    // check if the user 
}

export default userLogin