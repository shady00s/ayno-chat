"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const sendMessageValidator = [
    (0, express_validator_1.body)('conversation_id').isEmpty().isString(),
    (0, express_validator_1.body)('message_content').isEmpty().isString(),
];
exports.default = sendMessageValidator;
//# sourceMappingURL=send_message_validator.js.map