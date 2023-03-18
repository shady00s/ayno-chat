"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const sendVoteParticepentValidator = [
    (0, express_validator_1.body)('conversation_id').notEmpty().isString(),
    (0, express_validator_1.body)('voteId').notEmpty().isString(),
    (0, express_validator_1.body)('participent_choice').notEmpty().isString()
];
exports.default = sendVoteParticepentValidator;
//# sourceMappingURL=send_vote_particepent_validation.js.map