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
import ignoreFriendRequest from '../controller/user_controller/friends_controller/ignore_friend_request';
import editProfileController from "../controller/user_controller/edit_profile";
import { editProfileValidator } from "../utils/middlewares/validators/editProfileValidators";
import { groupValidator } from "../utils/middlewares/validators/group_route_validators/create_group_validation";
import createGroup from "../controller/user_controller/group_controller/create_group";
import getGroups from '../controller/user_controller/group_controller/get_groups';
import getGroupContacts from '../controller/user_controller/group_controller/get_group_contacts';
import sendImageValidation from "../utils/middlewares/validators/send_image_validation";
import getMediaContoller from "../controller/user_controller/get_media";
import addContactToGroup from "../controller/user_controller/group_controller/add_contact_group";
import add_contact_group_validator from '../utils/middlewares/validators/group_route_validators/add_contact_group_validator';
import getUserFriendsController from "../controller/user_controller/friends_controller/friends";
import friendReqValidator from '../utils/middlewares/validators/friends_routes_validators/friend_req_validator';
import getMediaValidator from "../utils/middlewares/validators/get_media_validator";
import searchValidator from "../utils/middlewares/validators/search_validator";
import groupInformationValidation from "../utils/middlewares/validators/group_route_validators/group_information";
import getGroupContactValidator from "../utils/middlewares/validators/group_route_validators/get_group_contacts_validator";
import loginValidator from "../utils/middlewares/validators/login_validator";
import registerValidator from '../utils/middlewares/validators/register_validator';
import removeFriend from "../controller/user_controller/friends_controller/remove_friend";
import logOutController from "../controller/user_controller/log-out";
import getNewMembersFromFriends from "../controller/user_controller/group_controller/get_new_members_from_friends";
import ignoreFriendValidator from "../utils/middlewares/validators/friends_routes_validators/ignore_friend_request_validator";
import acceptFriendValidator from "../utils/middlewares/validators/friends_routes_validators/accept_friend_validator";

const userRouter = express.Router()

userRouter.post('/register',registerValidator,userRegistrationController)

userRouter.get('/login',loginValidator,userLogin)

userRouter.get('/checkAuthentication',checkSessionAuthenticationController)

userRouter.get('/loginAuth',logInFromSession)

userRouter.get('/friends',sessionMiddleware,getUserFriendsController)

userRouter.post('/add-friend',friendReqValidator,sessionMiddleware,addFriendRequestController)

userRouter.post('/accept-friend',acceptFriendValidator,sessionMiddleware,postAcceptFriendController)

userRouter.post('/send-image' ,sessionMiddleware,sendImageValidation,sendImage)

userRouter.get('/get-media',sessionMiddleware,getMediaValidator,getMediaContoller)

userRouter.get('/get-friend-requests',sessionMiddleware,friendRequestController)

userRouter.get('/ignore-friend-requests',sessionMiddleware,ignoreFriendValidator,ignoreFriendRequest)

userRouter.get('/search',sessionMiddleware,searchValidator,search_user)

userRouter.get('/group-information',sessionMiddleware,groupInformationValidation,getGroupInformation)

userRouter.get('/get-groups',sessionMiddleware,getGroups)

userRouter.post('/edit-profile',sessionMiddleware,editProfileValidator,editProfileController)

userRouter.post('/create-group',sessionMiddleware,groupValidator,createGroup)

userRouter.get('/get-group-contacts',getGroupContactValidator,sessionMiddleware,getGroupContacts)

userRouter.post('/add-contact-to-group',add_contact_group_validator,addContactToGroup)

userRouter.post('/remove-friend',sessionMiddleware,removeFriend)

userRouter.get ('/logout',logOutController)

userRouter.get("/get-new-group-members",sessionMiddleware,getNewMembersFromFriends)

export default userRouter