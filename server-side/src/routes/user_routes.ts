import express from "express";
import userRegistrationController from "../controller/user_controller/registration";
import getUserFriendsController from "../controller/user_controller/friends";
import search_user from './../controller/user_controller/search_user';
import userLogin from './../controller/user_controller/log-in';
import sendImage from "../controller/user_controller/send_image";
import postAcceptFriendController from "../controller/user_controller/add_friends";
import addFriendRequestController from "../controller/user_controller/friend_req";
import getMediaContoller from "../controller/get_media";
import { logInFromSession, sessionMiddleware } from '../session';

const userRouter = express.Router()

userRouter.post('/register',userRegistrationController)

userRouter.post('/login',userLogin)

userRouter.get('/loginAuth',logInFromSession)

userRouter.get('/friends',sessionMiddleware,getUserFriendsController)

userRouter.post('/add-friend',addFriendRequestController)

userRouter.post('/accept-friend',postAcceptFriendController)

userRouter.post('/send-image' ,sendImage)

userRouter.get('/get-media',getMediaContoller)

userRouter.get('/search',search_user)


export default userRouter