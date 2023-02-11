
import  express  from 'express';
import getChatMessages from './../controller/chat_controller/chat_messages';
import postMessageController from '../controller/chat_controller/send_messages';
import { sessionMiddleware } from '../session';
import getGroupMessages from '../controller/chat_controller/group_messages';
const chatRouter = express.Router()


chatRouter.post('/messages',sessionMiddleware,getChatMessages )

chatRouter.post('/send-message',sessionMiddleware,postMessageController)
chatRouter.get('/group-message',sessionMiddleware,getGroupMessages)
chatRouter.post('/send-group-message',sessionMiddleware,getGroupMessages)

export default chatRouter