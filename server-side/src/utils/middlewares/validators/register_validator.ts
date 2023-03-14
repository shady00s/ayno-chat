import { body } from "express-validator"

const registerValidator = [
    body('username').notEmpty().isString(),
    body('password').notEmpty().isString(),
    body('profilePath').notEmpty().isString()
]

export default registerValidator