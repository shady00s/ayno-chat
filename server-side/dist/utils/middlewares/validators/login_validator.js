"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const loginValidator = [
    (0, express_validator_1.body)('user_name').notEmpty().isString(),
    (0, express_validator_1.body)('user_password').notEmpty().isString()
];
exports.default = loginValidator;
//# sourceMappingURL=login_validator.js.map