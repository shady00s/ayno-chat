import {io} from "socket.io-client"

class SocketClientManager{
    static  socketInit = ()=>{
        return io("ws://192.168.1.4:8080",{transports:['websocket']})
     }
     
}

export default SocketClientManager