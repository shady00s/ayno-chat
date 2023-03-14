import { body } from "express-validator"

const friendReqValidator = [
    body('friend_id').notEmpty().isString()
]

export default friendReqValidator