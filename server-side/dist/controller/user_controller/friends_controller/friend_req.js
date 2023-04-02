"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../../../model/user_model"));
const express_validator_1 = require("express-validator");
const addFriendRequestController = (req, res) => {
    const friend_id = req.body.friend_id;
    const user_id = req.session.userData.userId;
    // check if the id is not empty 
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        try {
            user_model_1.default.findById(user_id).then(async (user) => {
                if (user !== null) {
                    user_model_1.default.findByIdAndUpdate({ _id: friend_id }, { $addToSet: { friendRequests: user_id } }, { new: true }).then(friend_data => {
                        if (friend_data !== null) {
                            res.status(200).json({ message: "succsses , request was sent." });
                        }
                        else {
                            res.status(500).json({ message: "friend is already existed" });
                        }
                    });
                }
                else {
                    res.status(500).json({ message: "the user id is not found", });
                }
            });
        }
        catch (error) {
            res.status(500).json({ message: "error occured", error });
        }
    }
    else {
        res.status(500).json({ message: "there is error with user id or contact id", });
    }
};
exports.default = addFriendRequestController;
//# sourceMappingURL=friend_req.js.map