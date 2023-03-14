import { body } from "express-validator";

const sendVoteParticepentValidator = [
    body('conversation_id').notEmpty().isString(),
    body('voteId').notEmpty().isString(),
    body('participent_choice').notEmpty().isString()
]

export default sendVoteParticepentValidator