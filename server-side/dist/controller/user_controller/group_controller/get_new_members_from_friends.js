"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const groups_model_1 = __importDefault(require("../../../model/groups_model"));
const user_model_1 = __importDefault(require("../../../model/user_model"));
async function getNewMembersFromFriends(req, res) {
    const user_id = req.session.userData.userId;
    const group_id = req.query.group_id;
    const friendsList = await user_model_1.default.findById(user_id).then(userFriends => userFriends.friends);
    const groupMembers = await groups_model_1.default.findOne({ conversation_id: group_id }).then(groupsMembers => groupsMembers.members_ids);
    const filteredFriends = [];
    const remainedFriends = [];
    if (friendsList !== null && groupMembers !== null) {
        const friends = new Set(friendsList.map(val => val.toString()));
        const groupMembersSet = new Set(groupMembers.map(val => val.toString()));
        const combinedList = [...friendsList.map(val => val.toString()), ...groupMembers.map(val => val.toString())];
        combinedList.forEach((a) => {
            if (friends.has(a) && !groupMembersSet.has(a) && user_id.toString() !== a) {
                remainedFriends.push(a);
            }
        });
        await user_model_1.default.find({ "_id": { $in: remainedFriends } }).then(val => {
            for (let index = 0; index < val.length; index++) {
                let userData = {};
                userData['id'] = val[index]._id,
                    userData['name'] = val[index].name,
                    userData['profileImagePath'] = val[index].profileImagePath,
                    filteredFriends.push(userData);
            }
        });
    }
    res.status(200).json({ message: "succssess", filteredFriends });
}
exports.default = getNewMembersFromFriends;
//# sourceMappingURL=get_new_members_from_friends.js.map