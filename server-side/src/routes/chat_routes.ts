
import  express  from 'express';
import getChatMessages from './../controller/chat_controller/chat_messages';
import postMessageController from '../controller/chat_controller/send_messages';
import { sessionMiddleware } from '../session';
const chatRouter = express.Router()


chatRouter.post('/messages',sessionMiddleware,getChatMessages )

chatRouter.post('/send-message',sessionMiddleware,postMessageController)

export default chatRouter