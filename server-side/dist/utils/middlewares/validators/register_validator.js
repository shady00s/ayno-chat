"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const registerValidator = [
    (0, express_validator_1.body)('username').notEmpty().isString(),
    (0, express_validator_1.body)('password').notEmpty().isString(),
    (0, express_validator_1.body)('profilePath').notEmpty().isString()
];
exports.default = registerValidator;
//# sourceMappingURL=register_validator.js.map