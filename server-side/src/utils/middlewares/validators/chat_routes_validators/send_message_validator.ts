import { body } from "express-validator";

const sendMessageValidator = [
    body('conversation_id').notEmpty().isString(),
    body('message_content').notEmpty().isString(),
]

export default sendMessageValidator