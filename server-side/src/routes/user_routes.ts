import express from "express";
import userRegistrationController from "../controller/user_controller/registration";
import getUserFriendsController from "../controller/user_controller/friends";
import search_user from './../controller/user_controller/search_user';
import userLogin from './../controller/user_controller/log-in';
import postAddFriendController from "../controller/user_controller/add_friends";
const userRouter = express.Router()

userRouter.post('/register',userRegistrationController)

userRouter.post('/login',userLogin)

userRouter.get('/friends',getUserFriendsController)

userRouter.post('/add-friend',postAddFriendController)

userRouter.post('/')

userRouter.get('/search',search_user)


export default userRouter