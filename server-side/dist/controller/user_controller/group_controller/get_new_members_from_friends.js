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
    const friendsList = new Set(await user_model_1.default.findById(user_id).then(userFriends => userFriends.friends));
    const groupMembers = new Set(await groups_model_1.default.findOne({ conversation_id: group_id }).then(groupsMembers => groupsMembers.members_ids));
    if (friendsList !== null && groupMembers !== null) {
        const result = new Set([...friendsList].filter(result => !groupMembers.has(result)));
        res.status(200).json({ message: "succssess", result });
    }
}
exports.default = getNewMembersFromFriends;
//# sourceMappingURL=get_new_members_from_friends.js.map