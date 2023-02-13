import {Server, Socket} from "socket.io"
import Logining from '../logger';
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

let io:Server; 
let socketManager = {
    connectSocket: (server:http.Server)=>{
         io = new Server(server,{cors:{origin:"*",methods:["GET","POST"]}})

         return  io 
    },

    sendMessage:(messageData)=>{
        io.on('recive-message',(socket:Socket)=>{
            socket.emit('send-message',messageData)
        })
    },

    friendRequest :(friendReqest)=>{
        io.emit('friend-request',friendReqest)
    }
}

export {socketManager}