import express from "express";
import userRegistrationController from "../controller/user_controller/registration";
import getUserFriendsController from "../controller/user_controller/friends";
import search_user from './../controller/user_controller/search_user';
import userLogin from './../controller/user_controller/log-in';
import sendImage from "../controller/user_controller/send_image";
import postAcceptFriendController from "../controller/user_controller/add_friends";
import addFriendRequestController from "../controller/user_controller/friend_req";
import getMediaContoller from "../controller/get_media";
import { checkSessionAuthenticationController, logInFromSession, sessionMiddleware } from '../utils/middlewares/session';
import { friendRequestController } from "../controller/user_controller/friend_requests_list";
import getGroupList from '../controller/user_controller/group_list';
import ignoreFriendRequest from './../controller/user_controller/ignore_friend_request';
import editProfileController from "../controller/user_controller/edit_profile";
import { editProfileValidator } from "../utils/validators/editProfileValidators";
import { groupValidator } from "../utils/validators/create_group_validation";
import createGroup from "../controller/user_controller/create_group";

const userRouter = express.Router()

userRouter.post('/register',userRegistrationController)

userRouter.post('/login',userLogin)

userRouter.get('/checkAuthentication',checkSessionAuthenticationController)

userRouter.get('/loginAuth',logInFromSession)

userRouter.get('/friends',sessionMiddleware,getUserFriendsController)

userRouter.post('/add-friend',sessionMiddleware,addFriendRequestController)

userRouter.post('/accept-friend',sessionMiddleware,postAcceptFriendController)

userRouter.post('/send-image' ,sessionMiddleware,sendImage)

userRouter.get('/get-media',sessionMiddleware,getMediaContoller)

userRouter.get('/get-friend-requests',sessionMiddleware,friendRequestController)

userRouter.get('/ignore-friend-requests',sessionMiddleware,ignoreFriendRequest)

userRouter.get('/search',sessionMiddleware,search_user)

userRouter.get('/get-groups',sessionMiddleware,getGroupList)

userRouter.post('/edit-profile',sessionMiddleware,editProfileValidator,editProfileController)

userRouter.post('/create-group',sessionMiddleware,groupValidator,createGroup)

export default userRouter