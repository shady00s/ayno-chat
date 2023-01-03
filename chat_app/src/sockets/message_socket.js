import {io} from "socket.io-client"

class SocketClientManager{
     static socketInit = ()=>{
        return io("ws://localhost:8080",{autoConnect:true})
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