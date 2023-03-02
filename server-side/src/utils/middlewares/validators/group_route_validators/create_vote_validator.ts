import { body } from "express-validator";

const createVoteValidator = [
    body('voteQuestion').notEmpty().isString(),
    body('voteChoices').isArray(),
    body('message').notEmpty().isString(),
    body('conversation_id').notEmpty().isString()
]

export default createVoteValidator