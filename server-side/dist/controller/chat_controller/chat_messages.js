"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conversation_model_1 = __importDefault(require("../../model/conversation_model"));
const mongoose_1 = __importDefault(require("mongoose"));
const getChatMessages = async (req, res) => {
    // const user_id = req.session.userData.userId;
    // let friend_id = req.query.friend_id;
    const conversation_id = req.query.conversation_id;
    const pageNumber = req.query.page || 0;
    if (conversation_id !== undefined) {
        try {
            const page = parseInt(pageNumber.toString());
            const perPage = 50;
            const skip = (page - 1) * perPage;
            conversation_model_1.default.aggregate([
                { $match: { conversation_id: new mongoose_1.default.Types.ObjectId(conversation_id.toString()) } },
                { $project: { messages: { $slice: ["$messages", skip, perPage] } } },
                { $unwind: "$messages" },
                { $sort: { "messages.date": 1, "messages._id": 1 } },
                { $match: { "messages._id": { $ne: null } } }
            ]).exec((error, result) => {
                if (error) {
                    res.status(500).json({
                        message: "there is an error",
                        error
                    });
                }
                else {
                    res.status(200).json({
                        message: "succssess",
                        pageNumber: page,
                        conversations: result
                    });
                }
            });
        }
        catch (error) {
            res.status(500).json({
                message: "therer is an error",
                error
            });
        }
    }
    else {
        res.status(500).json({
            message: "invalid arguments",
        });
    }
};
exports.default = getChatMessages;
//# sourceMappingURL=chat_messages.js.map