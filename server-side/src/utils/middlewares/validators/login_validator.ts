import { query } from 'express-validator';
const loginValidator = [
    query('user_name').notEmpty().isString(),
    query('user_password').notEmpty().isString()
]

export default loginValidator