"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.friendRequestController = void 0;
const user_model_1 = __importDefault(require("../../../model/user_model"));
function friendRequestController(req, res) {
    const user_id = req.session.userData.userId;
    try {
        user_model_1.default.findById(user_id).then(async (value) => {
            if (value !== null) {
                await user_model_1.default.find({ _id: { $in: value.friendRequests } }).select(['-password', '-friends', '-__v', '-friendRequests', '-conversations']).then(friendReqVal => {
                    res.status(200).json({ message: "succssess", friendRequests: friendReqVal });
                });
            }
            else {
                res.status(500).json({ message: "no user found" });
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: "error occured", error });
    }
}
exports.friendRequestController = friendRequestController;
//# sourceMappingURL=friend_requests_list.js.map