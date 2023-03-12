import express from "express";
import userRegistrationController from "../controller/user_controller/registration";
import search_user from './../controller/user_controller/search_user';
import userLogin from './../controller/user_controller/log-in';
import sendImage from "../controller/user_controller/send_image";
import postAcceptFriendController from "../controller/user_controller/friends_controller/add_friends";
import addFriendRequestController from "../controller/user_controller/friends_controller/friend_req";
import { checkSessionAuthenticationController, logInFromSession, sessionMiddleware } from '../utils/middlewares/session';
import { friendRequestController } from "../controller/user_controller/friends_controller/friend_requests_list";
import getGroupInformation from '../controller/user_controller/group_controller/group_information';
import ignoreFriendRequest from './../controller/user_controller/ignore_friend_request';
import editProfileController from "../controller/user_controller/edit_profile";
import { editProfileValidator } from "../utils/middlewares/validators/editProfileValidators";
import { groupValidator } from "../utils/middlewares/validators/create_group_validation";
import createGroup from "../controller/user_controller/group_controller/create_group";
import getGroups from '../controller/user_controller/group_controller/get_groups';
import getGroupContacts from '../controller/user_controller/group_controller/get_group_contacts';
import getGroupMessages from './../controller/chat_controller/group_messages';
import sendImageValidation from "../utils/middlewares/validators/send_image_validation";
import getMediaContoller from "../controller/user_controller/get_media";
import addContactToGroup from "../controller/user_controller/group_controller/add_contact_group";
import add_contact_group_validator from '../utils/middlewares/validators/group_route_validators/add_contact_group_validator';
import getUserFriendsController from "../controller/user_controller/friends_controller/friends";

const userRouter = express.Router()

userRouter.post('/register',userRegistrationController)

userRouter.post('/login',userLogin)

userRouter.get('/checkAuthentication',checkSessionAuthenticationController)

userRouter.get('/loginAuth',logInFromSession)

userRouter.get('/friends',sessionMiddleware,getUserFriendsController)

userRouter.post('/add-friend',sessionMiddleware,addFriendRequestController)

userRouter.post('/accept-friend',sessionMiddleware,postAcceptFriendController)

userRouter.post('/send-image' ,sendImageValidation,sessionMiddleware,sendImage)

userRouter.get('/get-media',sessionMiddleware,getMediaContoller)

userRouter.get('/get-friend-requests',sessionMiddleware,friendRequestController)

userRouter.get('/ignore-friend-requests',sessionMiddleware,ignoreFriendRequest)

userRouter.get('/search',sessionMiddleware,search_user)

userRouter.get('/group-information',sessionMiddleware,getGroupInformation)

userRouter.get('/get-groups',sessionMiddleware,getGroups)

userRouter.post('/edit-profile',sessionMiddleware,editProfileValidator,editProfileController)

userRouter.post('/create-group',sessionMiddleware,groupValidator,createGroup)

userRouter.get('/get-group-contacts',sessionMiddleware,getGroupContacts)

userRouter.get('/get-group-messages',sessionMiddleware,getGroupMessages)

userRouter.post('/add-contact-to-group',add_contact_group_validator,addContactToGroup)

export default userRouter