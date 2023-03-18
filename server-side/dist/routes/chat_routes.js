"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chat_messages_1 = __importDefault(require("./../controller/chat_controller/chat_messages"));
const send_messages_1 = __importDefault(require("../controller/chat_controller/send_messages"));
const session_1 = require("../utils/middlewares/session");
const group_messages_1 = __importDefault(require("../controller/chat_controller/group_messages"));
const send_group_message_1 = __importDefault(require("../controller/chat_controller/send_group_message"));
const send_group_message_validation_1 = __importDefault(require("../utils/middlewares/validators/group_route_validators/send_group_message_validation"));
const get_user_messages_1 = __importDefault(require("../utils/middlewares/validators/chat_routes_validators/get_user_messages"));
const send_message_validator_1 = __importDefault(require("../utils/middlewares/validators/chat_routes_validators/send_message_validator"));
const create_vote_validator_1 = __importDefault(require("../utils/middlewares/validators/group_route_validators/create_vote_validator"));
const create_vote_1 = __importDefault(require("../controller/chat_controller/create_vote"));
const send_vote_participent_1 = __importDefault(require("../controller/chat_controller/send-vote-participent"));
const send_vote_particepent_validation_1 = __importDefault(require("../utils/middlewares/validators/chat_routes_validators/send_vote_particepent_validation"));
const group_message_validation_1 = __importDefault(require("../utils/middlewares/validators/group_route_validators/group_message_validation"));
const chatRouter = express_1.default.Router();
chatRouter.get('/messages', get_user_messages_1.default, session_1.sessionMiddleware, chat_messages_1.default);
chatRouter.post('/send-message', send_message_validator_1.default, session_1.sessionMiddleware, send_messages_1.default);
chatRouter.get('/group-messages', group_message_validation_1.default, session_1.sessionMiddleware, group_messages_1.default);
chatRouter.post('/send-group-message', send_group_message_validation_1.default, session_1.sessionMiddleware, send_group_message_1.default);
chatRouter.post('/create-vote', create_vote_validator_1.default, session_1.sessionMiddleware, create_vote_1.default);
chatRouter.post('/send-vote-particepent', send_vote_particepent_validation_1.default, session_1.sessionMiddleware, send_vote_participent_1.default);
exports.default = chatRouter;
//# sourceMappingURL=chat_routes.js.map