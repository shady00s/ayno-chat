import { body } from 'express-validator';
const sendImageValidation = [
    body('conversation_id').isString().isEmpty(),
    body('sender_image_path').isString().isEmpty(),
    body('type').isString().isEmpty(),
    body('media').isArray().isEmpty(),
]

export default sendImageValidation