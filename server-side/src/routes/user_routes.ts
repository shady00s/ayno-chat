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
import { friendRequestController } from "../controller/user_controller/friend_requests";

const userRouter = express.Router()

userRouter.post('/register',userRegistrationController)

userRouter.post('/login',userLogin)

userRouter.get('/loginAuth',logInFromSession)

userRouter.get('/friends',sessionMiddleware,getUserFriendsController)

userRouter.post('/add-friend',sessionMiddleware,addFriendRequestController)

userRouter.post('/accept-friend',sessionMiddleware,postAcceptFriendController)

userRouter.post('/send-image' ,sessionMiddleware,sendImage)

userRouter.get('/get-media',sessionMiddleware,getMediaContoller)

userRouter.get('/get-friend-requests',sessionMiddleware,friendRequestController)

userRouter.get('/search',sessionMiddleware,search_user)


export default userRouter