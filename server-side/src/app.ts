import express from "express";
import  Logining  from "./logger";
import userRouter from "./routes/user_routes";
import mongoose from 'mongoose';
import * as dotenv from 'dotenv' ;
import chatRouter from './routes/chat_routes';
import http from 'http'
import SocketManager from "./sockets/socket_manager";
import cors from 'cors'
import UserData from "./types/session_type";
import {default as connectMongoDBSession}from "connect-mongodb-session"
import cookieSession from "express-session";
import "express-session";
declare module "express-session"{
    interface SessionData{
        userData:UserData
    }
}
dotenv.config()
const app = express()
const MongoDBStore = connectMongoDBSession(cookieSession);
const store = new MongoDBStore({
    uri:`mongodb+srv://${process.env.DATABASE_USER_NAME}:${process.env.DATABASE_PASSWORD}@chatdatabase.fnneyaw.mongodb.net/`,
    collection:"usermodels",
    expires: 1000,
})
app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({extended:true,limit:"50mb"}))
app.use(cors({methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],allowedHeaders:"*"}))
app.enable('trust proxy')

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Methods','*')
    res.header('Access-Control-Allow-Headers','*')

    next()
})
require('dotenv').config()
// api rules
app.set('trust proxy',1)
app.use(cookieSession({
    store:store,
    resave: true,
    saveUninitialized: false,
     secret: process.env.SESSION_SECRET
     ,cookie:{
         maxAge: 60000,
        secure:false,
        httpOnly:true
 
     }
 }))






app.use('/user',userRouter)
app.use('/chat',chatRouter)


try {
    mongoose.connect(`mongodb+srv://${process.env.DATABASE_USER_NAME}:${process.env.DATABASE_PASSWORD}@chatdatabase.fnneyaw.mongodb.net/
    `,{retryWrites:true,w:'majority'}).then((val)=>{
        Logining.info('connected to mongo database '+val.connect.name)

       const server:http.Server = app.listen(8080,()=>{
            Logining.info("connected to port 8080")
        })
        SocketManager.connect(server)
       // SocketManager.messageSocket()
       
    })

    
    mongoose.set('strictQuery',false)
} catch (error) {
 Logining.error('faild to connect to mongo database'+error)   
}