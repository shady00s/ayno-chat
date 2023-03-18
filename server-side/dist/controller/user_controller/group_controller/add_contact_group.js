"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const groups_model_1 = __importDefault(require("../../../model/groups_model"));
const express_validator_1 = require("express-validator");
function addContactToGroup(req, res) {
    const conversation_id = req.body.conversation_id;
    const newContactList = req.body.new_contact_list;
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        groups_model_1.default.findOneAndUpdate({ conversation_id: conversation_id }, { $addToSet: { members_ids: { $each: [...newContactList] } } }, { new: true }).then(val => {
            if (val !== null) {
                res.status(201).json({ message: "succsses", val });
            }
        });
    }
    else {
        res.status(500).json({ message: "error", errors });
    }
}
exports.default = addContactToGroup;
//# sourceMappingURL=add_contact_group.js.map