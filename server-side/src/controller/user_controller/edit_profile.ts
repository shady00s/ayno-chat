import { Response, Request } from "express";
import user_model from "../../model/user_model";
import PasswordManager from "../../utils/managers/password_manager";
import { validationResult } from "express-validator";
import { store } from '../../server';
export default async function editProfileController(req: Request, res: Response) {
    const user_data = req.session.userData

    const newUserName = req.body.newUserName
    const newUserPassword = req.body.newUserPassword
    const newProfileImagePath = req.body.newProfileImagePath
    let userEditedData: any = {}


    const reqErrors = validationResult(req)
    try {

        if (!reqErrors.isEmpty()) {
            res.status(400).json({ message: "errors found", errors: reqErrors })
        }
        else {
            const password = await PasswordManager.encode(newUserPassword.toString()).then(val => val)

            if (newUserName !== "") {
                userEditedData.name = newUserName
            } if (newUserPassword !== "") {
                userEditedData.password = password
            }
            if (newProfileImagePath !== "") {
                userEditedData.profileImagePath = newProfileImagePath
            }
            //save the new data into store
            store.get(req.sessionID, (err, session) => {
                if (err) {
                    res.status(501).json({ message: "there is an error while getting session", err })
                } else {
                    if (newUserName !== "") {
                        session.userData.userName = newUserName
                    }
                    if (newProfileImagePath !== "") {
                        session.userData.userProfilePath = newProfileImagePath
                    }
                }
                store.set(req.sessionID, session, (err) => {
                    if (err) {
                        res.status(501).json({ message: "there is an error while setting session", err })
                    }
                })
            })

            user_model.findByIdAndUpdate({ _id: user_data.userId }, userEditedData, { new: true }).then(newpersonVal => {
                if (newpersonVal !== null) {
                    res.status(201).json({ message: "succssess", newpersonVal })
                }
            })
        }

    } catch (error) {
        res.status(500).json({ message: "there is an error" })

    }
}