"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const user_model_1 = __importDefault(require("../../../model/user_model"));
async function removeFriend(req, res) {
    const user_id = req.session.userData.userId;
    const friend_id = req.body.friend_id;
    console.log(friend_id);
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        try {
            user_model_1.default.findByIdAndUpdate({ _id: user_id }, { $pull: { friends: friend_id } }, { new: true }).select(["-password", "-groups", "-conversations"]).then(newData => {
                res.status(201).json({ message: "succssess", body: newData });
            });
        }
        catch (error) {
            res.status(501).json({ message: "error", error });
        }
    }
}
exports.default = removeFriend;
//# sourceMappingURL=remove_friend.js.map