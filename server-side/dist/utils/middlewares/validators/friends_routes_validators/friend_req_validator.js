"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const friendReqValidator = [
    (0, express_validator_1.body)('friend_id').notEmpty().isString()
];
exports.default = friendReqValidator;
//# sourceMappingURL=friend_req_validator.js.map