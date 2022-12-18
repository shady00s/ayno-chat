import express from "express";
import userRegistrationController from "../controller/user_controller/registration";
import getUserFriendsController from "../controller/user_controller/friends";
import search_user from './../controller/user_controller/search_user';
import userLoginController from './../controller/user_controller/login';
const userRouter = express.Router()

userRouter.post('/register',userRegistrationController)

userRouter.get('/login',userLoginController)

userRouter.get('/friends',getUserFriendsController)

userRouter.post('/')

userRouter.get('/search',search_user)


export default userRouter