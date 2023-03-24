"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const registration_1 = __importDefault(require("../controller/user_controller/registration"));
const search_user_1 = __importDefault(require("./../controller/user_controller/search_user"));
const log_in_1 = __importDefault(require("./../controller/user_controller/log-in"));
const send_image_1 = __importDefault(require("../controller/user_controller/send_image"));
const add_friends_1 = __importDefault(require("../controller/user_controller/friends_controller/add_friends"));
const friend_req_1 = __importDefault(require("../controller/user_controller/friends_controller/friend_req"));
const session_1 = require("../utils/middlewares/session");
const friend_requests_list_1 = require("../controller/user_controller/friends_controller/friend_requests_list");
const group_information_1 = __importDefault(require("../controller/user_controller/group_controller/group_information"));
const ignore_friend_request_1 = __importDefault(require("./../controller/user_controller/ignore_friend_request"));
const edit_profile_1 = __importDefault(require("../controller/user_controller/edit_profile"));
const editProfileValidators_1 = require("../utils/middlewares/validators/editProfileValidators");
const create_group_validation_1 = require("../utils/middlewares/validators/group_route_validators/create_group_validation");
const create_group_1 = __importDefault(require("../controller/user_controller/group_controller/create_group"));
const get_groups_1 = __importDefault(require("../controller/user_controller/group_controller/get_groups"));
const get_group_contacts_1 = __importDefault(require("../controller/user_controller/group_controller/get_group_contacts"));
const send_image_validation_1 = __importDefault(require("../utils/middlewares/validators/send_image_validation"));
const get_media_1 = __importDefault(require("../controller/user_controller/get_media"));
const add_contact_group_1 = __importDefault(require("../controller/user_controller/group_controller/add_contact_group"));
const add_contact_group_validator_1 = __importDefault(require("../utils/middlewares/validators/group_route_validators/add_contact_group_validator"));
const friends_1 = __importDefault(require("../controller/user_controller/friends_controller/friends"));
const friend_req_validator_1 = __importDefault(require("../utils/middlewares/validators/friends_routes_validators/friend_req_validator"));
const get_media_validator_1 = __importDefault(require("../utils/middlewares/validators/get_media_validator"));
const search_validator_1 = __importDefault(require("../utils/middlewares/validators/search_validator"));
const group_information_2 = __importDefault(require("../utils/middlewares/validators/group_route_validators/group_information"));
const get_group_contacts_validator_1 = __importDefault(require("../utils/middlewares/validators/group_route_validators/get_group_contacts_validator"));
const login_validator_1 = __importDefault(require("../utils/middlewares/validators/login_validator"));
const register_validator_1 = __importDefault(require("../utils/middlewares/validators/register_validator"));
const remove_friend_1 = __importDefault(require("../controller/user_controller/friends_controller/remove_friend"));
const log_out_1 = __importDefault(require("../controller/user_controller/log-out"));
const get_new_members_from_friends_1 = __importDefault(require("../controller/user_controller/group_controller/get_new_members_from_friends"));
const ignore_friend_request_validator_1 = __importDefault(require("../utils/middlewares/validators/friends_routes_validators/ignore_friend_request_validator"));
const userRouter = express_1.default.Router();
userRouter.post('/register', register_validator_1.default, registration_1.default);
userRouter.get('/login', login_validator_1.default, log_in_1.default);
userRouter.get('/checkAuthentication', session_1.checkSessionAuthenticationController);
userRouter.get('/loginAuth', session_1.logInFromSession);
userRouter.get('/friends', session_1.sessionMiddleware, friends_1.default);
userRouter.post('/add-friend', friend_req_validator_1.default, session_1.sessionMiddleware, friend_req_1.default);
userRouter.post('/accept-friend', session_1.sessionMiddleware, add_friends_1.default);
userRouter.post('/send-image', session_1.sessionMiddleware, send_image_validation_1.default, send_image_1.default);
userRouter.get('/get-media', session_1.sessionMiddleware, get_media_validator_1.default, get_media_1.default);
userRouter.get('/get-friend-requests', session_1.sessionMiddleware, friend_requests_list_1.friendRequestController);
userRouter.get('/ignore-friend-requests', session_1.sessionMiddleware, ignore_friend_request_validator_1.default, ignore_friend_request_1.default);
userRouter.get('/search', session_1.sessionMiddleware, search_validator_1.default, search_user_1.default);
userRouter.get('/group-information', session_1.sessionMiddleware, group_information_2.default, group_information_1.default);
userRouter.get('/get-groups', session_1.sessionMiddleware, get_groups_1.default);
userRouter.post('/edit-profile', session_1.sessionMiddleware, editProfileValidators_1.editProfileValidator, edit_profile_1.default);
userRouter.post('/create-group', session_1.sessionMiddleware, create_group_validation_1.groupValidator, create_group_1.default);
userRouter.get('/get-group-contacts', session_1.sessionMiddleware, get_group_contacts_validator_1.default, get_group_contacts_1.default);
userRouter.post('/add-contact-to-group', add_contact_group_validator_1.default, add_contact_group_1.default);
userRouter.post('/remove-friend', session_1.sessionMiddleware, remove_friend_1.default);
userRouter.post('/logout', search_validator_1.default, log_out_1.default);
userRouter.get("/get-new-group-members", session_1.sessionMiddleware, get_new_members_from_friends_1.default);
exports.default = userRouter;
//# sourceMappingURL=user_routes.js.map