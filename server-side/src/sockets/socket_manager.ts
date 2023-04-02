import { Server, Socket } from "socket.io"
import Logining from '../utils/logger';
import http from "http"


// export default SocketManager
let io:Server;
let users = [];
let oldConversation:string;
let socketManager = {
    connectSocket: (server: http.Server): Server => {
         io = new Server(server, { cors: { origin: "*", methods: ["GET", "POST"] } })
        io.on('connection', (socket) => {
            Logining.info('connection at socket ' + socket.id)
           

           
            socket.on("join-conversation",(conversation)=>{
                oldConversation = conversation
                socket.join(conversation)
            })
            // to join group conversation
            socket.on('join-group-conversation',(groupConversation)=>{
                socket.leave(oldConversation)
                socket.join(groupConversation)
            })
        
    
            socket.on('disconnect',()=>{
                Logining.error('client disconnected with id '+ socket.id)
                users = users.filter(data=>data.socket !== socket.id)
                io.emit('online-users',users)

                
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

            socket.on("isTyping", ({name,conversation_id,isTyping})=>{
                socket.to(conversation_id).emit("typing-data",name,isTyping)
            })
        
            socket.on("send-messages", (textVal,conversation_id) => {
                io.in(conversation_id).emit("recive-message", textVal);
                socket.to(conversation_id).emit("newMessage",{newMessage:1,conversation_id})
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
                            socket.to(id.id).emit('notification',{...id})
                            break
                        default:
                            break;
                    }
                })
            })
        }
    },
    groupMessageSocket:()=>{
        if (!io) {
            Logining.error('error at socket')
            return
        }
        io.on('connection',(socket)=>{
            
            socket.on("isTyping", ({name,conversation_id,isTyping})=>{
                socket.to(conversation_id).emit("typing-data",name,isTyping)
            })
            socket.on('join-group-conversation',(conversation)=>{
                socket.join(conversation)
            })
            socket.on('send-group-message',(message,conversation_id)=>{
                io.in(conversation_id).emit('recive-group-message',message)
            })
            socket.on('send-vote-participent',(participent,conversation_id)=>{
                io.in(conversation_id).emit('recive-vote-participent',participent)

            })
        })
       
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