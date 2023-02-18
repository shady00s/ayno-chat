import { NextFunction, Request,Response } from "express"
import user_model from "../../model/user_model"
import PasswordManager from "../../utils/managers/password_manager"


const userLogin = (req:Request,res:Response,next:NextFunction)=>{

    const user_name = req.body.user_name
    const user_password = req.body.user_password

    if(user_name !== undefined && user_password !== undefined){
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

             
            
              req.session.save(function(err){
                if(err){
                  res.status(400).json({message:"session err",err:err})
                 
                }
                else{
                  res.redirect('/user/loginAuth')

                }
               
              
              });
              
             
              
            }
            else{
              res.status(500).json({message:`wrong email or password`})
            }
         
        }
        else{
          res.status(500).json({message:`no user with name ${user_name}`})
        }
      
      })

   
    }catch(error){
      res.status(500).json({message:`error occured ${user_name}`})
    }
    }
    else{
      res.status(500).json({message:`user name or password are undefined`})
    }
    // check if the user 
}

export default userLogin