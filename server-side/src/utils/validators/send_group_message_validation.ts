import { body } from "express-validator";

const groupMessageValidation = [
    body('conversation_id').isEmpty(),
    body('message_content').isEmpty().isString(),
    body('sender_image_path').isEmpty().isString()
]

export default groupMessageValidation