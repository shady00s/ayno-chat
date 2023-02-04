import {Server, Socket} from "socket.io"
import Logining from '../logger';
import http from "http"

class SocketManager {

    private static io:Server;

    static connect = (server:http.Server)=>{
        this.io = new Server(server,{cors:{origin:"*",methods:["GET","POST"]}});


            return  this.io.on("connection",(socket:Socket)=>{
            Logining.info(`client Socket ID ${socket.id} connected to server`)
        })
      

    }
    static messageSocket=()=>{
     
        this.io.on("connection",(socket)=>{
            Logining.info(`client Socket ID ${socket.id} connected to server`)
            
            // send message
            socket.on("send-message", (messages) =>{
                this.io.emit("recive-message",messages)   

            })
        })
      
    }
    static imageSocket = (imageUrl:any)=>{
        this.io.emit("image",imageUrl)
    }
    
   
}


export default SocketManager