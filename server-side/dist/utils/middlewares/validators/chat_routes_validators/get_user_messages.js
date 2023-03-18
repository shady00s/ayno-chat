"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const getUserMessagesValidator = [
    (0, express_validator_1.query)('conversation_id').isEmpty().isString(),
    (0, express_validator_1.query)('page').isEmpty().isInt()
];
exports.default = getUserMessagesValidator;
//# sourceMappingURL=get_user_messages.js.map