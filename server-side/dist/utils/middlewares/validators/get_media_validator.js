"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const getMediaValidator = [
    (0, express_validator_1.query)('conversation_id').notEmpty().isString()
];
exports.default = getMediaValidator;
//# sourceMappingURL=get_media_validator.js.map