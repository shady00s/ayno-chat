import { query } from "express-validator";

const ignoreFriendValidator = [
    query('friend_id').notEmpty().isString()
]

export default ignoreFriendValidator