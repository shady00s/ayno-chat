import { query } from "express-validator";

const groupMessagesValidator = [
    query("conversation_id").isEmpty().isString(),
    query('page').isEmpty().isInt()
]