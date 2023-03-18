"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../../model/user_model"));
function ignoreFriendRequest(req, res) {
    const user_id = req.session.userData.userId;
    const friend_id = req.query.friend_id;
    if (friend_id !== "") {
        try {
            user_model_1.default.findByIdAndUpdate(user_id, { $pull: { friendRequests: friend_id } }, { new: true }).then(userData => {
                if (userData !== null) {
                    res.status(201).json({ message: "request removed", userData: userData.friendRequests });
                }
            });
        }
        catch (error) {
        }
    }
    else {
        res.status(500).json({ message: "friend id is not found" });
    }
}
exports.default = ignoreFriendRequest;
//# sourceMappingURL=ignore_friend_request.js.map