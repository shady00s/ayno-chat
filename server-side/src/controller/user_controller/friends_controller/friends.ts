import { Request, Response } from "express"
import user_model from "../../../model/user_model"
import mongoose from "mongoose"
const getUserFriendsController = (req: Request, res: Response) => {
    const user_id = new mongoose.Types.ObjectId (req.session.userData.userId)
    try {
        if (user_id !== undefined) {
            user_model.findById(user_id).then(async value => {
                if (value !== null) {

                    let friendData = await user_model.aggregate([
                        { $match: { "_id": { $in: value.friends } } },
                        { $project: { 
                            name: 1, 
                            profileImagePath: 1, 
                            conversations: {
                                $filter: {
                                    input: "$conversations",
                                    as: "conversation",
                                    cond: { $eq: [ "$$conversation.contact_Id", user_id ] }
                                }
                            }
                        } }
                    ]);
                    res.status(200).json({
                        message: "succssess",
                        body: {
                            friends: friendData,

                        }
                    })
                } else {
                    res.status(200).json({
                        message: "user not found",

                    })
                }

            })

        }
        else {
            res.status(500).json({ message: "user_id is corrupted" })
        }
    } catch (error) {
        res.status(404).json({
            message: "bad request",

        })
    }


}

export default getUserFriendsController