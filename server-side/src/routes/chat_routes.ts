
import  express  from 'express';
import getChatMessages from './../controller/chat_controller/chat_messages';
import postMessageController from '../controller/chat_controller/send_messages';
import { sessionMiddleware } from '../utils/middlewares/session';
import getGroupMessages from '../controller/chat_controller/group_messages';
import sendGroupMessage from '../controller/chat_controller/send_group_message';
import groupMessageValidation from '../utils/middlewares/validators/send_group_message_validation';
import getUserMessagesValidator from '../utils/middlewares/validators/chat_routes_validators/get_user_messages';
import sendMessageValidator from '../utils/middlewares/validators/chat_routes_validators/send_message_validator';
import createVoteValidator from '../utils/middlewares/validators/group_route_validators/create_vote_validator';
import createVoteController from '../controller/chat_controller/create_vote';
import sendVoteParticipent from '../controller/chat_controller/send-vote-participent';
const chatRouter = express.Router()


chatRouter.get('/messages',getUserMessagesValidator,sessionMiddleware,getChatMessages )

chatRouter.post('/send-message',sendMessageValidator,sessionMiddleware,postMessageController)
chatRouter.get('/group-message',groupMessageValidation,sessionMiddleware,getGroupMessages)
chatRouter.post('/send-group-message',groupMessageValidation,sessionMiddleware,sendGroupMessage)
chatRouter.post('/create-vote',createVoteValidator,sessionMiddleware,createVoteController)
chatRouter.post('/send-vote-particepent',sessionMiddleware,sendVoteParticipent)
export default chatRouter