
import  express  from 'express';
import getChatMessages from './../controller/chat_controller/chat_messages';
const chatRouter = express.Router()


chatRouter.get('/:user_name',getChatMessages )


export default chatRouter