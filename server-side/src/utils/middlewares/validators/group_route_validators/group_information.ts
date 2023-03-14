import { query } from "express-validator"

const groupInformationValidation = [
    query('conversation_id').notEmpty().isString()
]

export default groupInformationValidation