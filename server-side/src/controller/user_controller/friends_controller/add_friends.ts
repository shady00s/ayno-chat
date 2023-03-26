import { NextFunction, Request, Response } from "express"
import user_model from "../../../model/user_model"
import mongoose from "mongoose"
import Logining from "../../../utils/logger"
import conversation_model from "../../../model/conversation_model"
import { validationResult } from 'express-validator';

const postAcceptFriendController = async (req: Request, res: Response, next: NextFunction) => {
    const user_id = req.session.userData.userId
    const contact_id = req.body.contact_id



    // create transaction between user and contact to add each other and create conversation 
    const generatedConversationId = new mongoose.Types.ObjectId
    
    const errors = validationResult(req)
    
    try {
        if (errors.isEmpty()) {
            let session = await mongoose.startSession()
            session.startTransaction()
            // check if the contact is not inside friends array

            await user_model.findById({ _id: user_id }).then(async result => {

                if (result.friends.find((data) => data.id == contact_id) === undefined) {

                    try {

                        let userInformation = await user_model.findByIdAndUpdate(user_id,
                            { $addToSet: { conversations: { conversation_Id: generatedConversationId, contact_Id: contact_id }, friends: contact_id },$pull:{friendRequests: contact_id} },

                            { new: true }).session(session).then(userValue => {
                                return userValue
                            })
                        let contactInformation = await user_model.findByIdAndUpdate(contact_id, { $addToSet: { conversations: { conversation_Id: generatedConversationId, contact_Id: user_id }, friends: user_id } }, { new: true }).session(session).then(contactValue => {
                            return contactValue
                        })
                        // create conversation 
                       let conversation =  await new conversation_model({ conversation_id: generatedConversationId, members_ids: [userInformation.id, contactInformation.id] }, { session }).save().then(result => { return result })

                        await session.commitTransaction().then(() => {
                            res.status(200).json({
                                message: "succssess",body:{
                                    _id:contactInformation._id,
                                    name:contactInformation.name,
                                    conversations:[{conversation_Id:conversation.conversation_id}],
                                    profileImagePath:contactInformation.profileImagePath
                                }

                            })

                        })




                    } catch (error) {
                        Logining.error(error)
                        res.status(400).json({ message: "session catchs an error", body: error })
                    } finally {
                        session.endSession()
                    }


                }
                else {
                    res.status(500).json({ message: "this contact is already your friend" })
                }


            })
        } else {
            res.status(500).json({ message: "error occured", errors })

        }





    } catch (error) {

        Logining.error("There is an error")
    }










}


export default postAcceptFriendController
