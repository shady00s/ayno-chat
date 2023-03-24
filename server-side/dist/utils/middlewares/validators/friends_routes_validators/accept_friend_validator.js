"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const acceptFriendValidator = [
    (0, express_validator_1.body)('contact_id').notEmpty().isString()
];
exports.default = acceptFriendValidator;
//# sourceMappingURL=accept_friend_validator.js.map