"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../../../model/user_model"));
const mongoose_1 = __importDefault(require("mongoose"));
const groups_model_1 = __importDefault(require("../../../model/groups_model"));
const express_validator_1 = require("express-validator");
const user_color_generator_1 = __importDefault(require("../../../utils/user_color_generator"));
async function createGroup(req, res) {
    const userData = req.session.userData.userId;
    const groupName = req.body.groupName;
    const groupMembers = req.body.groupMembers;
    const genereatedConversationId = new mongoose_1.default.Types.ObjectId;
    const allMembers = [...groupMembers, userData];
    const session = await mongoose_1.default.startSession();
    const membersColor = [];
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (errors.isEmpty()) {
            for (let index = 0; index < allMembers.length; index++) {
                membersColor.push({ id: allMembers[index], color: (0, user_color_generator_1.default)() });
            }
            session.startTransaction();
            await new groups_model_1.default({ conversation_id: genereatedConversationId, conversation_name: groupName, members_ids: [...allMembers], message_colors: [...membersColor] }, { session: session }).save().then(data => data);
            await user_model_1.default.updateMany({ _id: { $in: allMembers } }, { $addToSet: { groups: genereatedConversationId } }, { session: session, new: true }).then(val => val);
            await session.commitTransaction();
            res.status(200).json({ message: "done" });
        }
        else {
            session.abortTransaction();
            res.status(401).json({ message: "session error", errors });
        }
    }
    catch (error) {
        res.status(401).json({ message: "error occured", error });
    }
    finally {
        session.endSession();
    }
}
exports.default = createGroup;
//# sourceMappingURL=create_group.js.map