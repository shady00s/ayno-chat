"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const sendImageValidation = [
    (0, express_validator_1.body)('conversation_id').isString().isEmpty(),
    (0, express_validator_1.body)('sender_image_path').isString().isEmpty(),
    (0, express_validator_1.body)('type').isString().isEmpty(),
    (0, express_validator_1.body)('media').isArray().isEmpty(),
];
exports.default = sendImageValidation;
//# sourceMappingURL=send_image_validation.js.map