"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const sendMessageValidator = [
    (0, express_validator_1.body)('conversation_id').notEmpty().isString(),
    (0, express_validator_1.body)('message_content').notEmpty().isString(),
];
exports.default = sendMessageValidator;
//# sourceMappingURL=send_message_validator.js.map