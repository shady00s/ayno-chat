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
    let session = await mongoose_1.default.startSession();
    try {
        if (errors.isEmpty()) {
            session.startTransaction();
            await user_model_1.default.findByIdAndUpdate({ _id: user_id }, { $pull: { friends: friend_id } }, { new: true }).session(session).select(["-password", "-groups", "-conversations"]);
            await user_model_1.default.findByIdAndUpdate({ _id: friend_id }, { $pull: { friends: user_id } }, { new: true }).session(session).select(["-password", "-groups", "-conversations"]);
            await session.commitTransaction().then(() => {
                res.status(201).json({ message: "succssess" });
            });
        }
        else {
            res.status(501).json({ message: "error", errors });
        }
    }
    catch (error) {
        console.log(error);
        res.status(501).json({ message: "error", error });
    }
    finally {
        await session.endSession();
    }
}
exports.default = removeFriend;
//# sourceMappingURL=remove_friend.js.map