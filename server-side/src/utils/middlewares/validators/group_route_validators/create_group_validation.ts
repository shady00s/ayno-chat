import { body } from "express-validator";


export  const groupValidator = [
    body('groupName').isString().notEmpty(),
    body('groupMembers').isArray().notEmpty()
]