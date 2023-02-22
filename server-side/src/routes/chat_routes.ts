
import  express  from 'express';
import getChatMessages from './../controller/chat_controller/chat_messages';
import postMessageController from '../controller/chat_controller/send_messages';
import { sessionMiddleware } from '../utils/middlewares/session';
import getGroupMessages from '../controller/chat_controller/group_messages';
import sendGroupMessage from '../controller/chat_controller/send_group_message';
import groupMessageValidation from './../utils/validators/send_group_message_validation';
const chatRouter = express.Router()


chatRouter.get('/messages',sessionMiddleware,getChatMessages )

chatRouter.post('/send-message',sessionMiddleware,postMessageController)
chatRouter.get('/group-message',sessionMiddleware,getGroupMessages)
chatRouter.post('/send-group-message',sessionMiddleware,groupMessageValidation,sendGroupMessage)

export default chatRouter