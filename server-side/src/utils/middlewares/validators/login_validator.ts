import { body } from 'express-validator';
const loginValidator = [
    body('user_name').notEmpty().isString(),
    body('user_password').notEmpty().isString()
]

export default loginValidator