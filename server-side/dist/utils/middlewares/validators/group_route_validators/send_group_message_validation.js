"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const sendgroupMessageValidation = [
    (0, express_validator_1.body)('conversation_id').isEmpty(),
    (0, express_validator_1.body)('message_content').isEmpty().isString(),
    (0, express_validator_1.body)('sender_image_path').isEmpty().isString(),
    (0, express_validator_1.body)('sender_color').isEmpty().isString(),
    (0, express_validator_1.body)('sender_name').isEmpty().isString()
];
exports.default = sendgroupMessageValidation;
//# sourceMappingURL=send_group_message_validation.js.map