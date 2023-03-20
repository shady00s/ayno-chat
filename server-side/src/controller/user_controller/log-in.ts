import { NextFunction, Request, Response } from "express"
import user_model from "../../model/user_model"
import PasswordManager from "../../utils/managers/password_manager"
import { validationResult } from 'express-validator';
import { client, store } from './../../server';
import session from "express-session";


const userLogin = (req: Request, res: Response, next: NextFunction) => {

  const user_name = req.body.user_name
  const user_password = req.body.user_password
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    try {
      user_model.findOne({ name: user_name }).then(async userVal => {
        if (userVal !== null) {


          let isValidated: boolean = await PasswordManager.decode(user_password, userVal.password.toString())

          if (isValidated) {
            // check if the user had a previous session if not then save it and if found then touch it to re-initilize the datetime of the session
           
           try {
            client.db().collection('sessions').findOne({ "session.userData.userName": user_name }).then(returnedVal => {
              if (returnedVal === null) {
                req.session.userData = {
                  userId: userVal.id,
                  userName: userVal.name,
                  userProfilePath: userVal.profileImagePath
                }
                req.session.save(function (err) {
                  
                  if (err) {
                    res.status(400).json({ message: "session err", err: err })

                  }
                  else {
                    res.redirect('/user/loginAuth')

                  }
                });
              } else {
               
                  store.get(returnedVal._id.toString(), function (err,sessionData) {
                    if (err) {
                      res.status(400).json({ message: "session err", err: err })
                      
                    }else{
                      req.session.userData = {
                        userId:sessionData.userData.userId,
                        userName:sessionData.userData.userName,
                        userProfilePath:sessionData.userData.userProfilePath
                      }
                      console.log(req.session);
                    } 
                  })
                
                
              }
            })
           } catch (error) {
            res.status(500).json({ message: "error while getting session", err: error })

           }
            

          }
          else {
            res.status(500).json({ message: `wrong email or password` })
          }

        }
        else {
          res.status(500).json({ message: `no user with name ${user_name}` })
        }

      })


    } catch (error) {
      res.status(500).json({ message: `error occured ${user_name}` })
    }
  }
  else {
    res.status(500).json({ message: `user name or password are undefined` })
  }
  // check if the user 
}

export default userLogin