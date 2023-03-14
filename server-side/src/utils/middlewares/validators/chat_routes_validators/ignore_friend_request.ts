import { body } from "express-validator";

const ignoreFriendRequestValidator = [
    body('friend_id').notEmpty().isString()
]

export default ignoreFriendRequestValidator