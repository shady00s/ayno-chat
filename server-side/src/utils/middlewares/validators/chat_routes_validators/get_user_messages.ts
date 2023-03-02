import { query } from "express-validator";

const getUserMessagesValidator = [
    query('conversation_id').isEmpty().isString(),
    query('page').isEmpty().isInt()
]

export default getUserMessagesValidator