"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const groupInformationValidation = [
    (0, express_validator_1.query)('conversation_id').notEmpty().isString()
];
exports.default = groupInformationValidation;
//# sourceMappingURL=group_information.js.map