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
                const conversationData = result.conversations.find((results) => results.contact_Id.equals(result._id))
                if (result.friends.find((data) => data.equals(contact_id)) === undefined && conversationData === undefined) {

                    try {

                        let userInformation = await user_model.findByIdAndUpdate({ _id: user_id },
                            {
                                $push: { conversations: { conversation_Id: generatedConversationId, contact_Id: contact_id } },
                                $pull: { friendRequests: contact_id },
                                $addToSet: { friends: contact_id },

                            },
                            { new: true }).session(session)
                        let contactInformation = await user_model.findByIdAndUpdate({ _id: contact_id },
                            {
                                $push: { conversations: { conversation_Id: generatedConversationId, contact_Id: user_id } },
                                $addToSet: { friends: user_id }
                            }, { new: true }).session(session)
                        // create conversation 
                        let conversation = await new conversation_model({ conversation_id: generatedConversationId, members_ids: [userInformation.id, contactInformation.id] }, { session: session }).save()

                        await session.commitTransaction().then((val) => {

                            if (val.ok === 1) {
                                res.status(200).json({
                                    message: "succssess",
                                    body: {
                                        _id: contactInformation._id,
                                        name: contactInformation.name,
                                        conversations: [{ conversation_Id: conversation.conversation_id,contact_Id:user_id }],
                                        profileImagePath: contactInformation.profileImagePath
                                    }, userData: { 
                                        _id: userInformation._id,
                                        name: userInformation.name,
                                        profileImagePath: userInformation.profileImagePath,
                                        conversations: [{ conversation_Id: conversation.conversation_id, contact_id: contact_id }] }

                                })
                            }


                        })




                    } catch (error) {
                        Logining.error(error)
                        res.status(400).json({ message: "session catchs an error", body: error })
                    } finally {
                        session.endSession()
                    }


                }
                else if (conversationData !== undefined) {

                    try {


                       let userData = await user_model.findByIdAndUpdate(user_id, {
                            $addToSet: { friends: contact_id },
                            $pull: { friendRequests: contact_id },


                        }, { new: true }).session(session);

                        let contactData = await user_model.findByIdAndUpdate(contact_id, {
                            $addToSet: { friends: user_id },

                        }, { new: true}).session(session);

                         session.commitTransaction().then((val) => {
                            if (val.ok===1) {
                                res.status(200).json({
                                    message: "succssess", body: {
                                        _id: contactData._id,
                                        name: contactData.name,
                                        conversations: [{ conversation_Id: conversationData.conversation_Id, contact_Id: user_id }],
                                        profileImagePath: contactData.profileImagePath
                                    },userData:{
                                        _id: userData._id,
                                        name: userData.name,
                                        conversations: [{ conversation_Id: conversationData.conversation_Id, contact_Id: contact_id }],
                                        profileImagePath: userData.profileImagePath
                                    }

                                })

                            }

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
        console.log(error);
        Logining.error("There is an error")
    }










}


export default postAcceptFriendController
