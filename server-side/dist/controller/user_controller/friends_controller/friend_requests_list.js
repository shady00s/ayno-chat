"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.friendRequestController = void 0;
const user_model_1 = __importDefault(require("../../../model/user_model"));
function friendRequestController(req, res) {
    const user_id = req.session.userData.userId;
    const friendRequestList = [];
    try {
        user_model_1.default.findById(user_id).then(async (value) => {
            if (value !== null) {
                for (let index = 0; index < value.friendRequests.length; index++) {
                    await user_model_1.default.findById({ _id: value.friendRequests[index] }).select(['-password', '-friends', '-__v', '-friendRequests', '-conversations']).then(friendReqVal => {
                        // check if there is currpted user_id then remove it from list
                        if (friendReqVal !== null) {
                            friendRequestList.push(friendReqVal);
                        }
                    });
                }
                res.status(200).json({ message: "succssess", friendRequests: friendRequestList });
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