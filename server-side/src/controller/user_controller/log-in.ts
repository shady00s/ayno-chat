import { NextFunction, Request, Response } from "express"
import user_model from "../../model/user_model"
import PasswordManager from "../../utils/managers/password_manager"
import { validationResult } from 'express-validator';
import { client, store } from './../../server';


const userLogin = (req: Request, res: Response, next: NextFunction) => {

  const user_name = req.query.user_name
  const user_password = req.query.user_password
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    try {
      user_model.findOne({ name: user_name }).then(async userVal => {
        if (userVal !== null) {


          let isValidated: boolean = await PasswordManager.decode(user_password.toString(), userVal.password.toString())
          if (isValidated) {
            // check if the user had a previous session if not then save it and if found then touch it to re-initilize the datetime of the session

            try {
            await  client.db().collection('sessions').findOne({ "session.userData.userName": user_name }).then(async returnedVal => {
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
                    res.redirect('/user/loginAuth')
                  });

                } else {
                  req.session.userData = returnedVal.session.userData
                  req.session.save(async function (err) {

                    if (err) {
                      res.status(400).json({ message: "session err", err: err })

                    }
                    await  client.db().collection('sessions').findOneAndDelete({ _id: returnedVal._id }).then(val => {
                      if (val !== null) {
                        res.redirect('/user/loginAuth')
  
                      } else {
                        res.status(400).json({ message: "error occured" })
  
                      }
                    })
                  });

                }


              })


            }
            catch (err) {
              res.status(400).json({ message: `no user with name ${user_name}` })

            }
          } else {
            res.status(400).json({ message: "wrong name or password" })

          }
        }
        else {
          res.status(400).json({ message: `user  ${user_name} not found` })

        }

      })


    } catch (error) {
      res.status(400).json({ message: `error occured ${user_name}` })
    }
  }
  else {
    res.status(400).json({ message: `user name or password are undefined` })
  }
  // check if the user 
}

export default userLogin


//2023-03-29T14:14:15.802+00:00
//2023-03-29T14:36:58.546+00:00
  