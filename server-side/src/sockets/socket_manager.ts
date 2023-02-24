import { Server, Socket } from "socket.io"
import Logining from '../utils/logger';
import http from "http"


// export default SocketManager

let io: Server
let socketManager = {
    connectSocket: (server: http.Server): Server => {
        io = new Server(server, { cors: { origin: "*", methods: ["GET", "POST"] } })
        io.on('connection', (socket) => {
            Logining.info('connection at socket ' + socket.id)
            socket.on('disconnect',()=>{
                Logining.error('client disconnected with id '+ socket.id)
     
            })
        })
        return io
    },
    messageSocket: () => {
        if (!io) {
            Logining.error('error at socket')
            return
        }
        io.on('connection', (socket) => {
            socket.on('send-messages', (textVal,conversation_id) => {
                console.log(textVal);
                socket.to(conversation_id).emit('recive-message', textVal);
            })
            
        })

    },
    groupMessageSocket:()=>{
        if (!io) {
            Logining.error('error at socket')
            return
        }
        io.on('connection',(socket)=>{
            socket.on('send-group-message',(message,conversation_id)=>{
                io.to(conversation_id).emit('recive-group-message',message)

                socket.on('disconnect',()=>{
                    Logining.error('client disconnected with id '+ socket.id)
         
                })
            })
        })
       
    },
    imageSocket: () => {
        io.on('connection', (socket) => {
            io.emit('image')
        })
    }


}





export { socketManager }