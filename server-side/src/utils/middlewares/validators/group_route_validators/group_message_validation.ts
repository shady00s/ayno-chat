import { query } from "express-validator";

const groupMessagesValidator = [
    query("conversation_id").notEmpty().isString(),
    query('page').notEmpty().isInt()
]