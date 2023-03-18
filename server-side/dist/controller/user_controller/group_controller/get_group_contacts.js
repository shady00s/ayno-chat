"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const groups_model_1 = __importDefault(require("../../../model/groups_model"));
const user_model_1 = __importDefault(require("../../../model/user_model"));
const express_validator_1 = require("express-validator");
function getGroupContacts(req, res) {
    const user_id = req.session.userData.userId;
    const group_id = req.query.groupId;
    const errors = (0, express_validator_1.validationResult)(req);
    groups_model_1.default.findOne({ conversation_id: group_id }).then(async (group) => {
        if (errors.isEmpty()) {
            if (group !== null) {
                const contacts = [];
                for (let index = 0; index < group.members_ids.length; index++) {
                    let ids = group.members_ids[index]._id.toString();
                    if (ids === user_id.toString())
                        continue;
                    contacts.push(ids);
                }
                await user_model_1.default.find({ _id: { $in: [...contacts] } }).select(['-conversations', '-password', '-friends', '-friendRequests', '-groups']).then(users => {
                    if (users !== null) {
                        res.status(200).json({ message: "succssess", body: users });
                    }
                });
            }
        }
        else {
            res.status(500).json({ message: "there is an error", errors });
        }
    });
}
exports.default = getGroupContacts;
//# sourceMappingURL=get_group_contacts.js.map