"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const groups_model_1 = __importDefault(require("../../../model/groups_model"));
const user_model_1 = __importDefault(require("../../../model/user_model"));
const express_validator_1 = require("express-validator");
async function getGroupContacts(req, res) {
    const user_id = req.session.userData.userId;
    const group_id = req.query.groupId;
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        const groupData = await groups_model_1.default.findOne({ conversation_id: group_id });
        const userData = await user_model_1.default.findById(user_id);
        const userFriends = new Set(userData.friends.map(val => val.toString()));
        const userRequests = new Set(userData.friendRequests.map(val => val.toString()));
        const userConvs = new Set(userData.conversations);
        const resLast = [];
        //get all group members except user
        await user_model_1.default.find({ "_id": { $in: [...groupData.members_ids]
                    .filter(data => !data.equals(user_id)) } }).select(['-password', '-groups']).then(groupMembers => {
            //create editied object for each user to check if it is in friends or in friend request
            for (let index = 0; index < groupMembers.length; index++) {
                let isFriend = userFriends.has(groupMembers[index]._id.toString());
                let result = {};
                result['name'] = groupMembers[index].name,
                    result['id'] = groupMembers[index]._id,
                    result['profileImagePath'] = groupMembers[index].profileImagePath,
                    result['isFriend'] = isFriend;
                result['isInFriendRequest'] = userRequests.has(groupMembers[index]._id.toString());
                result['conversation_id'] = isFriend ? [...userConvs].filter(contact => contact.contact_Id.equals(groupMembers[index]._id))[0].conversation_Id : undefined;
                //push to array
                resLast.push(result);
            }
            res.status(200).json({ message: "succssess", body: resLast });
        });
    }
    else {
        res.status(500).json({ message: "there is an error", errors });
    }
}
exports.default = getGroupContacts;
//# sourceMappingURL=get_group_contacts.js.map