"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const groupMessagesValidator = [
    (0, express_validator_1.query)("conversation_id").notEmpty().isString(),
    (0, express_validator_1.query)('page').notEmpty().isInt()
];
exports.default = groupMessagesValidator;
//# sourceMappingURL=group_message_validation.js.map