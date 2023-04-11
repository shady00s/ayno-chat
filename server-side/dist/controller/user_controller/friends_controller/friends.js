"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../../../model/user_model"));
const mongoose_1 = __importDefault(require("mongoose"));
const getUserFriendsController = (req, res) => {
    const user_id = new mongoose_1.default.Types.ObjectId(req.session.userData.userId);
    try {
        if (user_id !== undefined) {
            user_model_1.default.findById(user_id).then(async (value) => {
                if (value !== null) {
                    let friendData = await user_model_1.default.aggregate([
                        { $match: { "_id": { $in: value.friends } } },
                        { $project: {
                                name: 1,
                                profileImagePath: 1,
                                conversations: {
                                    $filter: {
                                        input: "$conversations",
                                        as: "conversation",
                                        cond: { $eq: ["$$conversation.contact_Id", user_id] }
                                    }
                                }
                            } }
                    ]);
                    res.status(200).json({
                        message: "succssess",
                        body: {
                            friends: friendData,
                        }
                    });
                }
                else {
                    res.status(200).json({
                        message: "user not found",
                    });
                }
            });
        }
        else {
            res.status(500).json({ message: "user_id is corrupted" });
        }
    }
    catch (error) {
        res.status(404).json({
            message: "bad request",
        });
    }
};
exports.default = getUserFriendsController;
//# sourceMappingURL=friends.js.map