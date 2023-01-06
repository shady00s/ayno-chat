import {Server, Socket} from "socket.io"
import Logining from './../logger';
import http from "http"
import { conversationModel, messageModelType } from "../types/message_types";
import { userModel } from "../types/user_types";
class SocketManager {

    private static io:Server;

    static connect = (server:http.Server)=>{
        this.io = new Server(server,{cors:{origin:"http://localhost:3000",methods:["GET","POST"]}});


         this.io.on("connection",(socket:Socket)=>{
            Logining.info(`client Socket ID ${socket.id} connected to server`)
        })
      

    }
    static messageSocket=(server:http.Server)=>{
        this.io = new Server(server,{cors:{origin:"http://localhost:3000"}});
     
        
        this.io.on("connection",(socket)=>{
            Logining.info(`client Socket ID ${socket.id} connected to server`)
            
            // send message
            socket.on("send-message", (messages) =>{
                socket.emit("recive-message",messages)   

            })
        })
      
    }
   
}


export default SocketManager