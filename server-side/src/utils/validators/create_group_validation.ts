import { body } from "express-validator";


export  const groupValidator = [
    body('groupName').isString().isEmpty(),
    body('groupMembers').isArray()
]