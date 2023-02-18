import {Server, Socket} from "socket.io"
import Logining from '../utils/logger';
import http from "http"

// class SocketManager {
//    public  imageUrl:any;
//    private  friendRequest:any;
//     private  io:Server;

//     public connect = (server:http.Server)=>{
//           this.io = new Server(server,{cors:{origin:"*",methods:["GET","POST"]}});


//             return  this.io.on("connection",(socket:Socket)=>{
//             Logining.info(`client Socket ID ${socket.id} connected to server`)
//                 this.messageSocketController(socket)
//                 this.imageSocket(socket)
//                 this.friendRequestSocket(socket)
//         })
      

//     }
//    private  messageSocketController=(server:Socket)=>{
//                 server.on("send-message", (messages) =>{
                   
//                 this.io.emit("recive-message",messages)   
//             })
//         }
      
//         public   getReqData = (data)=>{ return this.friendRequest = data}
    
//     private  imageSocket = (socket:Socket)=>{
//         socket.emit("image", this.imageUrl)
//     }
//     private  friendRequestSocket = (socket:Socket)=>{
//         socket.emit('friend-request',this.friendRequest)
//     }
   
// }


// export default SocketManager


let socketManager = {
    connectSocket: (server:http.Server)=>{
        let io = new Server(server,{cors:{origin:"*",methods:["GET","POST"]}})
         io.on('connection',(socket)=>{
            io.emit('online',{isOnline:true})
            Logining.info(`user connected to socket with ID ${socket.id}`)
            // message socket
            socket.on('send-message',(messages)=>{
                io.emit('recive-message',messages)
                
            })
        })
         return  io 
    },
   
}



  

export {socketManager}