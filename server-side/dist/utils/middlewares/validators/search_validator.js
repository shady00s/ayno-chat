"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const searchValidator = [
    (0, express_validator_1.query)('contactName').notEmpty().isString()
];
exports.default = searchValidator;
//# sourceMappingURL=search_validator.js.map