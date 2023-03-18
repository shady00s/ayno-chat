"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupValidator = void 0;
const express_validator_1 = require("express-validator");
exports.groupValidator = [
    (0, express_validator_1.body)('groupName').isString().notEmpty(),
    (0, express_validator_1.body)('groupMembers').isArray().notEmpty()
];
//# sourceMappingURL=create_group_validation.js.map