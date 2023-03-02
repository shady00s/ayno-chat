import {io} from "socket.io-client"

class SocketClientManager{
    static  socketInit = ()=>{
        return io("ws://192.168.174.246:8080",{transports:['websocket']})
     }
     
}

export default SocketClientManager