import {Server, Socket} from "socket.io"
import Logining from '../utils/logger';
import http from "http"


// export default SocketManager


let socketManager = {
    connectSocket: (server:http.Server)=>{
        const io = new Server(server,{cors:{origin:"*",methods:["GET","POST"]}})
         io.on('connection',(socket)=>{
            io.emit('online',{isOnline:true})
            Logining.info(`user connected to socket with ID ${socket.id}`)
            // message socket
            socket.on('send-message',(messages)=>{
                io.emit('recive-message',messages)
                
            })
        })
    },
   
}



  

export {socketManager}