import { body } from "express-validator";

const acceptFriendValidator = [
    body('contact_id').notEmpty().isString()
]

export default acceptFriendValidator