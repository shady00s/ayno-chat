import { body } from "express-validator";

export  const editProfileValidator = [
    body('newUserName').isString(),
     body('newUserPassword').isString(),
    body('newProfileImagePath').isString() ,
]