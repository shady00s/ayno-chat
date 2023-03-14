import { query } from "express-validator";

const getGroupContactValidator = [
    query('groupId').notEmpty().isString()
]

export default getGroupContactValidator