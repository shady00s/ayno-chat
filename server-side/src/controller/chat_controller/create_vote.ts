import { Request, Response } from "express";
import groups_model from "../../model/groups_model";
import { validationResult } from "express-validator";
import mongoose from "mongoose";
import { socketManager } from "../../sockets/socket_manager";

export default function createVoteController(req: Request, res: Response) {
    const user = req.session.userData
    const vote_question = req.body.voteQuestion
    const vote_choices = req.body.voteChoices
    const message = req.body.message
    const conversation_id = req.body.conversation_id
    const voteChoices = req.body.voteChoices
    const voteQuestion = req.body.voteQuestion
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(501).json({ message: "validation error", errors })


    } else {


        try {
            socketManager.groupSendMessageSocket(conversation_id,{
                message: "voting",
                type:"vote",
                votingData:{
                    voteQuestion:voteQuestion,
                    voteChoices,
                    voteParticepents:[]
                },
                conversation_id,
                sender_image_path: user.userProfilePath,
                sender_name: user.userName,
                sender_id: user.userId,
              })
            const generatedVoteId = new mongoose.Types.ObjectId()
            groups_model.findOneAndUpdate({ conversation_id: conversation_id }, {
                $push: {
                    messages: {
                        message: message,
                        votingData: {
                            voteId: generatedVoteId,
                            voteQuestion: vote_question,
                            voteChoices: vote_choices,
                            voteCreator: { creatorName: user.userName, creatorProfilePath: user.userProfilePath },
                        },
                        sender_name: user.userName,
                        sender_image_path: user.userProfilePath,
                        sender_id: user.userId,
                        type: "vote"

                    }
                }
            }, { new: true }).then(resData => {
                if (resData !== null) {
                    res.status(201).json({ message: "succssess", body: resData })

                }
            })
        } catch (error) {
            res.status(501).json({ message: "there is an error", error })
        }
    }
}