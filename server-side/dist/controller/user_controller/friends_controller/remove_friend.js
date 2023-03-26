"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const user_model_1 = __importDefault(require("../../../model/user_model"));
const mongoose_1 = __importDefault(require("mongoose"));
async function removeFriend(req, res) {
    const user_id = req.session.userData.userId;
    const friend_id = req.body.friend_id;
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        const session = await mongoose_1.default.startSession();
        session.startTransaction();
        try {
            await user_model_1.default.findByIdAndUpdate({ _id: user_id }, { $pull: { friends: friend_id } }, { new: true }).session(session).select(["-password", "-groups", "-conversations"]);
            await user_model_1.default.findByIdAndUpdate({ _id: friend_id }, { $pull: { friends: user_id } }, { new: true }).session(session).select(["-password", "-groups", "-conversations"]);
            session.commitTransaction().then(() => {
                res.status(201).json({ message: "succssess" });
            });
        }
        catch (error) {
            res.status(501).json({ message: "error", error });
        }
    }
    else {
        res.status(501).json({ message: "error", errors });
    }
}
exports.default = removeFriend;
//# sourceMappingURL=remove_friend.js.map