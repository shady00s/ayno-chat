"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../../../model/user_model"));
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("../../../utils/logger"));
const conversation_model_1 = __importDefault(require("../../../model/conversation_model"));
const express_validator_1 = require("express-validator");
const postAcceptFriendController = async (req, res, next) => {
    const user_id = req.session.userData.userId;
    const contact_id = req.body.contact_id;
    // create transaction between user and contact to add each other and create conversation 
    const generatedConversationId = new mongoose_1.default.Types.ObjectId;
    const errors = (0, express_validator_1.validationResult)(req);
    try {
        if (errors.isEmpty()) {
            let session = await mongoose_1.default.startSession();
            session.startTransaction();
            // check if the contact is not inside friends array
            await user_model_1.default.findById({ _id: user_id }).then(async (result) => {
                const conversationData = result.conversations.find((results) => results.contact_Id.equals(result._id));
                if (result.friends.find((data) => data.equals(contact_id)) === undefined && conversationData === undefined) {
                    try {
                        let userInformation = await user_model_1.default.findByIdAndUpdate({ _id: user_id }, {
                            $push: { conversations: { conversation_Id: generatedConversationId, contact_Id: contact_id } },
                            $pull: { friendRequests: contact_id },
                            $addToSet: { friends: contact_id },
                        }, { new: true }).session(session);
                        let contactInformation = await user_model_1.default.findByIdAndUpdate({ _id: contact_id }, {
                            $push: { conversations: { conversation_Id: generatedConversationId, contact_Id: user_id } },
                            $addToSet: { friends: user_id }
                        }, { new: true }).session(session);
                        // create conversation 
                        let conversation = await new conversation_model_1.default({ conversation_id: generatedConversationId, members_ids: [userInformation.id, contactInformation.id] }, { session: session }).save();
                        await session.commitTransaction().then((val) => {
                            if (val.ok === 1) {
                                res.status(200).json({
                                    message: "succssess",
                                    body: {
                                        _id: contactInformation._id,
                                        name: contactInformation.name,
                                        conversations: [{ conversation_Id: conversation.conversation_id, contact_Id: user_id }],
                                        profileImagePath: contactInformation.profileImagePath
                                    }, userData: {
                                        _id: userInformation._id,
                                        name: userInformation.name,
                                        profileImagePath: userInformation.profileImagePath,
                                        conversations: [{ conversation_Id: conversation.conversation_id, contact_id: contact_id }]
                                    }
                                });
                            }
                        });
                    }
                    catch (error) {
                        logger_1.default.error(error);
                        res.status(400).json({ message: "session catchs an error", body: error });
                    }
                    finally {
                        session.endSession();
                    }
                }
                else if (conversationData !== undefined) {
                    try {
                        let userData = await user_model_1.default.findByIdAndUpdate(user_id, {
                            $addToSet: { friends: contact_id },
                            $pull: { friendRequests: contact_id },
                        }, { new: true }).session(session);
                        let contactData = await user_model_1.default.findByIdAndUpdate(contact_id, {
                            $addToSet: { friends: user_id },
                        }, { new: true }).session(session);
                        session.commitTransaction().then((val) => {
                            if (val.ok === 1) {
                                res.status(200).json({
                                    message: "succssess", body: {
                                        _id: contactData._id,
                                        name: contactData.name,
                                        conversations: [{ conversation_Id: conversationData.conversation_Id, contact_Id: user_id }],
                                        profileImagePath: contactData.profileImagePath
                                    }, userData: {
                                        _id: userData._id,
                                        name: userData.name,
                                        conversations: [{ conversation_Id: conversationData.conversation_Id, contact_Id: contact_id }],
                                        profileImagePath: userData.profileImagePath
                                    }
                                });
                            }
                        });
                    }
                    catch (error) {
                        logger_1.default.error(error);
                        res.status(400).json({ message: "session catchs an error", body: error });
                    }
                    finally {
                        session.endSession();
                    }
                }
                else {
                    res.status(500).json({ message: "this contact is already your friend" });
                }
            });
        }
        else {
            res.status(500).json({ message: "error occured", errors });
        }
    }
    catch (error) {
        console.log(error);
        logger_1.default.error("There is an error");
    }
};
exports.default = postAcceptFriendController;
//# sourceMappingURL=add_friends.js.map