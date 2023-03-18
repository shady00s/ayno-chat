"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const groups_model_1 = __importDefault(require("../../model/groups_model"));
const express_validator_1 = require("express-validator");
const mongoose_1 = __importDefault(require("mongoose"));
function createVoteController(req, res) {
    const user = req.session.userData;
    const vote_question = req.body.voteQuestion;
    const vote_choices = req.body.voteChoices;
    const message = req.body.message;
    const conversation_id = req.body.conversation_id;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(501).json({ message: "validation error", errors });
    }
    else {
        try {
            const generatedVoteId = new mongoose_1.default.Types.ObjectId();
            groups_model_1.default.findOneAndUpdate({ conversation_id: conversation_id }, {
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
                    res.status(201).json({ message: "succssess", body: resData });
                }
            });
        }
        catch (error) {
            res.status(501).json({ message: "there is an error", error });
        }
    }
}
exports.default = createVoteController;
//# sourceMappingURL=create_vote.js.map