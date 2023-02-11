import {io} from "socket.io-client"

class SocketClientManager{
     static socketInit = ()=>{
        return io("ws://192.168.1.4:8080",{transports:['websocket']})
     }
     static sendMessage =(messageData,conversation)=>{
        
        try {
            const socket = this.socketInit()

            socket.emit("send-message",messageData,conversation)

        } catch (error) {
            console.log(error)
        }
       
       

       
    }

    static receiveMessage = (conversation)=>{
        
            const sockets = this.socketInit()
      return  sockets.on('recive-message',(message)=>message)
    }
}

export default SocketClientManager