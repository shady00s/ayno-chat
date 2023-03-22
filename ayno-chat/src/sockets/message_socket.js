import {io} from "socket.io-client"

class SocketClientManager{
    static  socketInit = ()=>{
        return io("http://ayno-chat-api.onrender.com",{transports:['websocket']})
     }
     
}

export default SocketClientManager