"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const add_contact_group_validator = [
    (0, express_validator_1.body)('conversation_id').notEmpty().isString(),
    (0, express_validator_1.body)('new_contact_list').isArray().notEmpty()
];
exports.default = add_contact_group_validator;
//# sourceMappingURL=add_contact_group_validator.js.map