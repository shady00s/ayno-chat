"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const ignoreFriendValidator = [
    (0, express_validator_1.query)('friend_id').notEmpty().isString()
];
exports.default = ignoreFriendValidator;
//# sourceMappingURL=ignore_friend_request_validator.js.map