"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const groups_model_1 = __importDefault(require("../../../model/groups_model"));
const express_validator_1 = require("express-validator");
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = __importDefault(require("../../../model/user_model"));
const user_color_generator_1 = __importDefault(require("./../../../utils/user_color_generator"));
async function addContactToGroup(req, res) {
    const conversation_id = req.body.conversation_id;
    const newContactList = req.body.new_contact_list;
    const errors = (0, express_validator_1.validationResult)(req);
    const contactsWithColors = newContactList.map(val => ({ id: val, color: (0, user_color_generator_1.default)() }));
    try {
        if (errors.isEmpty()) {
            const session = await mongoose_1.default.startSession();
            session.startTransaction();
            let groupData = await groups_model_1.default.findOneAndUpdate({ conversation_id: conversation_id }, { $addToSet: { members_ids: { $each: [...newContactList] }, message_colors: { $each: contactsWithColors } } }, { new: true }).session(session);
            await user_model_1.default.updateMany({ _id: { $in: newContactList } }, { $addToSet: { groups: conversation_id } }).session(session);
            await session.commitTransaction().then(val => {
                if (val.ok === 1) {
                    res.status(201).json({ message: "succsses", groupData });
                }
            });
        }
        else {
            res.status(500).json({ message: "error", errors });
        }
    }
    catch (error) {
        res.status(500).json({ message: "error occured", error });
    }
}
exports.default = addContactToGroup;
//# sourceMappingURL=add_contact_group.js.map