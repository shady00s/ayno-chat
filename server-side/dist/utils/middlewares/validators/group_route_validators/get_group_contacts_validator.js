"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const getGroupContactValidator = [
    (0, express_validator_1.query)('groupId').notEmpty().isString()
];
exports.default = getGroupContactValidator;
//# sourceMappingURL=get_group_contacts_validator.js.map