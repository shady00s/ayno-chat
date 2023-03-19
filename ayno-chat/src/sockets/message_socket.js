import {io} from "socket.io-client"

class SocketClientManager{
    static  socketInit = ()=>{
        return io("https://anyo-chat-api.onrender.com",{transports:['websocket']})
     }
     
}

export default SocketClientManager