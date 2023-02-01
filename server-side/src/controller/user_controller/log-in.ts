import { Request,Response } from "express"
import user_model from "../../model/user_model"
import PasswordManager from './utils/password_manager';
import Logining from './../../logger';



const userLogin = (req:Request,res:Response)=>{

    const user_name = req.body.user_name
    const user_password = req.body.user_password

    if(user_name !== undefined && user_password !== undefined)
    try{
        user_model.findOne({name:user_name}).then(async userVal=>{
          if(userVal!== null){
            req.session.userData={
              userId:userVal.id ,
              userName:userVal.name,
              userProfilePath:userVal.profileImagePath
            }
            req.session.save();
            
            let isValidated:boolean = await  PasswordManager.decode(user_password,userVal.password.toString())
  
            if(isValidated){
              res.status(200).json({
                  message:"succssess",
                  body:{
                      name:userVal.name,
                      id:userVal.id,
                      profilePath:userVal.profileImagePath
                  }
              })
            }
            else{
              res.status(500).json({message:"password or username is not correct"})
            }

          }
          else{
            res.status(500).json({message:`there is no account with name ${user_name}`})
          }
        })

    }catch(error){}
    // check if the user 
}

export default userLogin