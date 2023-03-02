import { body } from "express-validator";

const sendMessageValidator = [
    body('conversation_id').isEmpty().isString(),
    body('message_content').isEmpty().isString(),
]

export default sendMessageValidator