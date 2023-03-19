"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../../../model/user_model"));
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("../../../utils/logger"));
const conversation_model_1 = __importDefault(require("../../../model/conversation_model"));
const postAcceptFriendController = async (req, res, next) => {
    const user_id = req.session.userData.userId;
    const contact_id = req.body.contact_id;
    // create transaction between user and contact to add each other and create conversation 
    const connecton = mongoose_1.default.connection;
    let session = await connecton.startSession();
    const generatedConversationId = new mongoose_1.default.Types.ObjectId;
    try {
        // check if the contact is not inside friends array
        user_model_1.default.findById({ _id: user_id }).then(async (result) => {
            if (result.friends.find((data) => data.id == contact_id) === undefined) {
                try {
                    let sessionResult = await session.withTransaction(async () => {
                        let userInformation = await user_model_1.default.findByIdAndUpdate(user_id, { $addToSet: { conversations: { conversation_Id: generatedConversationId, contact_Id: contact_id }, friends: contact_id } }, { session, new: true }).then(userValue => {
                            return userValue;
                        });
                        //remove id from friend request array
                        await user_model_1.default.findByIdAndUpdate(user_id, { $pull: { friendRequests: contact_id } });
                        let contactInformation = await user_model_1.default.findByIdAndUpdate(contact_id, { $addToSet: { conversations: { conversation_Id: generatedConversationId, contact_Id: user_id }, friends: user_id } }, { session, new: true }).then(contactValue => {
                            return contactValue;
                        });
                        await new conversation_model_1.default({ conversation_id: generatedConversationId, members_ids: [userInformation.id, contactInformation.id] }).save().then(result => { return result; });
                        res.status(200).json({
                            message: "succssess",
                        });
                    });
                    if (sessionResult.ok !== 1) {
                        res.status(400).json({ message: "session has an error" });
                    }
                }
                catch (error) {
                    logger_1.default.error(error);
                    res.status(400).json({ message: "session catchs an error", body: error });
                    next();
                }
                finally {
                    session.endSession();
                    next();
                    logger_1.default.info("Session ended");
                }
            }
            else {
                res.status(500).json({ message: "this contact is already your friend" });
            }
        });
    }
    catch (error) {
        logger_1.default.error("There is an error");
    }
};
exports.default = postAcceptFriendController;
//# sourceMappingURL=add_friends.js.map