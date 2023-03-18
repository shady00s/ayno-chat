"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const ignoreFriendRequestValidator = [
    (0, express_validator_1.body)('friend_id').notEmpty().isString()
];
exports.default = ignoreFriendRequestValidator;
//# sourceMappingURL=ignore_friend_request.js.map