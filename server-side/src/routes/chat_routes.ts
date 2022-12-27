
import  express  from 'express';
import getChatMessages from './../controller/chat_controller/chat_messages';
import postMessageController from '../controller/chat_controller/send_messages';
const chatRouter = express.Router()


chatRouter.post('/:user_name',getChatMessages )

chatRouter.post('/send-message',postMessageController)

export default chatRouter