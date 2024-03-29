import express, { NextFunction } from "express";
import  Logining  from "./utils/logger";
import userRouter from "./routes/user_routes";
import mongoose from 'mongoose';
import * as dotenv from 'dotenv' ;
import chatRouter from './routes/chat_routes';
import { socketManager } from "./sockets/socket_manager";
import UserData from "./types/session_type";
import {default as connectMongoDBSession}from "connect-mongodb-session"
import session from "express-session";
import { Response,Request } from "express";
import "express-session";
import { createServer } from "http";
import {MongoClient} from "mongodb"
import EventEmitter from "events";
declare module "express-session"{
      interface SessionData{
        userData:UserData
    }
}
export const client = new MongoClient(`mongodb+srv://${process.env.DATABASE_USER_NAME}:${process.env.DATABASE_PASSWORD}@chatdatabase.fnneyaw.mongodb.net/
`)

dotenv.config()
const app = express()
const MongoDBStore = connectMongoDBSession(session);

//expires after one week
let expiredDate = 1000 * 60 * 60 * 24 * 7

export const store = new MongoDBStore({
    
    uri:`mongodb+srv://${process.env.DATABASE_USER_NAME}:${process.env.DATABASE_PASSWORD}@chatdatabase.fnneyaw.mongodb.net/`,
    
    collection:"sessions",
    expires:expiredDate,

 
})

app.set("trust proxy", 1);

app.use('/',(req:Request,res:Response,next:NextFunction)=>{
    res.setHeader('Access-Control-Allow-Origin',process.env.Client_URL)
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
      );
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type , Authorization , Origin , X-Requested-With,Accept');
      res.setHeader('Access-Control-Allow-Credentials', 'true')
    next()
})
app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({extended:true,limit:"50mb"}))



require('dotenv').config()
// api rules

app.use(session({
    name:"ayno.sid",
    store:store,
    resave: true,
    saveUninitialized: false,
     secret: process.env.SESSION_SECRET
     ,cookie:{
        maxAge: expiredDate,
        secure:true,
        httpOnly:false,
        sameSite:"none"
     },
     
 }))


app.use('/user',userRouter)
app.use('/chat',chatRouter)
app.use('*',(req:Request,res:Response)=>{
    res.json({message:"bad route"})
})



const server = createServer(app)

server.listen(8080,()=>{
    

    Logining.info("connected to port 8080")
    try {
        mongoose.set('strictQuery',true)
        
        mongoose.connect(`mongodb+srv://${process.env.DATABASE_USER_NAME}:${process.env.DATABASE_PASSWORD}@chatdatabase.fnneyaw.mongodb.net/
        `,{retryWrites:true,w:'majority',   
        
        
    }).then((val)=>{
        Logining.info('connected to mongo database ')
        
            
    })
} catch (error) {
    Logining.error('faild to connect to mongo database'+error)   
}
}) 

socketManager.connectSocket(server)
socketManager.messageSocket()
socketManager.groupSockets()
socketManager.notificationSocket()

