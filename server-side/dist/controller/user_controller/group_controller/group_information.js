"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../../../model/user_model"));
const groups_model_1 = __importDefault(require("../../../model/groups_model"));
const express_validator_1 = require("express-validator");
function getGroupInformation(req, res) {
    const user_id = req.session.userData.userId;
    const conversation_id = req.query.conversation_id;
    const errors = (0, express_validator_1.validationResult)(req);
    user_model_1.default.findById(user_id).then(async (userData) => {
        if (errors.isEmpty()) {
            // get all conversation groups (every conversation with conversation_name is group)
            try {
                // get group conversation 
                await groups_model_1.default.findOne({ conversation_id: conversation_id }).select(['-_id', '-__v', '-messages']).then(groupVal => {
                    if (groupVal !== null) {
                        res.status(200).json({ message: "succssess", body: {
                                conversation_id: groupVal.conversation_id,
                                conversation_name: groupVal.conversation_name,
                                media: groupVal.media,
                                members_count: groupVal.members_ids.length,
                                members_color: groupVal.message_colors
                            } });
                    }
                });
            }
            catch (error) {
                res.status(500).json({ message: "there is error", error: error });
            }
        }
        else {
            res.status(500).json({ message: "there is error", errors });
        }
    });
}
exports.default = getGroupInformation;
//# sourceMappingURL=group_information.js.map