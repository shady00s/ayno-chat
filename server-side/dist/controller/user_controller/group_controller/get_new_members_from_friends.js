"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const groups_model_1 = __importDefault(require("../../../model/groups_model"));
const user_model_1 = __importDefault(require("../../../model/user_model"));
async function getNewMembersFromFriends(req, res) {
    const user_id = req.session.userData.userId;
    const group_id = req.body.groupValidator;
    const friendsList = await user_model_1.default.findById(user_id).then(userFriends => userFriends.friends);
    const groupMembers = await groups_model_1.default.findOne({ conversation_id: group_id }).then(groupsMembers => groupsMembers.members_ids);
    const filteredFriends = [];
    if (friendsList !== null && groupMembers !== null) {
        for (let index = 0; index < friendsList.length; index++) {
            for (let index2 = 0; index2 < groupMembers.length; index2++) {
                if (!friendsList[index]._id.equals(groupMembers[index2]._id)) {
                    filteredFriends.push(friendsList[index]);
                }
            }
        }
        res.status(200).json({ message: "succssess", filteredFriends });
    }
}
exports.default = getNewMembersFromFriends;
//# sourceMappingURL=get_new_members_from_friends.js.map