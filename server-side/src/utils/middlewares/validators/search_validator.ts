import { query } from "express-validator"

const searchValidator = [
    query('contactName').notEmpty().isString()
]

export default searchValidator