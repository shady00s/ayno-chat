"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const createVoteValidator = [
    (0, express_validator_1.body)('voteQuestion').notEmpty().isString(),
    (0, express_validator_1.body)('voteChoices').isArray(),
    (0, express_validator_1.body)('message').notEmpty().isString(),
    (0, express_validator_1.body)('conversation_id').notEmpty().isString()
];
exports.default = createVoteValidator;
//# sourceMappingURL=create_vote_validator.js.map