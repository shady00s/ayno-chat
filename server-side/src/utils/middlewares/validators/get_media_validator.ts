import { query } from "express-validator";

const getMediaValidator = [
    query('conversation_id').notEmpty().isString()
]

export default getMediaValidator