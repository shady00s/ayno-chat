import { Server, Socket } from "socket.io"
import Logining from '../utils/logger';
import http from "http"

import * as dotenv from 'dotenv' ;
// export default SocketManager

dotenv.config()
let io:Server;
let users = [];
let oldConversation:string;

let socketManager = {
    connectSocket: (server: http.Server): Server => {
         io = new Server(server, { cors: { origin: "*", methods: ["GET", "POST"] } })
        io.on('connection', (socket) => {
            socket.setMaxListeners(13)
            Logining.info('connection at socket ' + socket.id)
            socket.on('disconnect',()=>{
                Logining.error('client disconnected with id '+ socket.id)
            })
        })
        return io
    },
    messageSocket: () => {
        if (!io) {
            Logining.error('error at socket')
            return
        }

        io.on('connection',(socket)=>{
            socket.on("join-conversation",(conversation)=>{
                oldConversation = conversation  
                socket.join(oldConversation)
            })
            socket.on("isTyping", ({name,conversation_id,isTyping})=>{
                socket.to(conversation_id).emit("typing-data",name,isTyping)
            })
        
            
        })
       
       

    },
    notificationSocket:()=>{
        if (!io) {
            Logining.error('error at socket')
            return
        }else{
            io.on('connection',(socket)=>{

                socket.on('global-id',(id)=>{
                    socket.join(id)
                })
                socket.on("new-notification",(id)=>{
                    switch (id.type) {
                        case "message":
                            socket.to(id.id).emit('notification',{...id})
                            break;
                        case "friend-request":
                          
                            socket.to(id.reciverId).emit('notification',{...id})
                            break
                        case "group-message":
                            socket.to(id.id).emit('notification',{...id})
                            break
                        case "new-friend":
                            socket.to(id.id).emit('notification',{...id})
                            break
                        case "new-group":
                            for (let index = 0; index < id.data.members_ids.length; index++) {
                                
                                socket.to(id.data.members_ids[index]).emit('notification',{...id})
                               
                            }
                            break
                        default:
                            break;
                    }
                })
            })
        }
    },
   
    groupSockets:()=>{
        if (!io) {
            Logining.error('error at socket')
            return
        }
        io.on('connection',(socket)=>{
            // to join group conversation
            socket.on('join-group-conversation',(groupConversation)=>{
                socket.join(groupConversation)
            })
            socket.on("isTyping", ({name,conversation_id,isTyping})=>{
                socket.to(conversation_id).emit("typing-data",name,isTyping)
            })
           
          
            socket.on('send-vote-participent',(participent,conversation_id)=>{
                socket.to(conversation_id).emit('recive-vote-participent',participent)

            })
        })
       
    },

    groupSendMessageSocket:(conversation_id:string,message:object)=>{
        if (!io) {
            Logining.error('error at socket')
            return
        }
        io.in(conversation_id).emit('recive-group-message',message)
    },

    userSendMessageSocket:(conversation_id:string,message:Object)=>{
        if (!io) {
            Logining.error('error at socket')
            return
        }
        io.in(conversation_id).emit('recive-message',message)
    },
    imageSocket: (conversation_ids:string,images:object) => {
        if (!io) {
            Logining.error('error at socket')
            return
        }

            io.in(conversation_ids).emit("images",images)

      
    }


}





export { socketManager }