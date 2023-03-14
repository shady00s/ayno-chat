import { body } from "express-validator";

const getMediaValidator = [
    body('conversation_id').notEmpty().isString()
]

export default getMediaValidator