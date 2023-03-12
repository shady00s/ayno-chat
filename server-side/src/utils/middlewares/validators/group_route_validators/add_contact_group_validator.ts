import { body } from "express-validator";

const add_contact_group_validator = [
    body('conversation_id').notEmpty().isString(),
    body('new_contact_list').isArray().notEmpty()
]

export default add_contact_group_validator