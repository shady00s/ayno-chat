import { query } from "express-validator";

const getGroupContactValidator = [
    query('groupId').isString().notEmpty()
]

export default getGroupContactValidator