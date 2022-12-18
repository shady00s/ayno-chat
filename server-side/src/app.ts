import express from "express";
import  Logining  from "./logger";
import userRouter from "./routes/user_routes";
import mongoose from 'mongoose';
import * as dotenv from 'dotenv' ;
import chatRouter from './routes/chat_routes';

dotenv.config()
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))


require('dotenv').config()
// api rules

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Methods','*')
    res.header('Access-Control-Allow-Headers','Origin , X-Requested-With , Content-Type , Accept , Authorization')

    next()
})
app.use('/user',userRouter)
app.use('/chats',chatRouter)



app.listen(8080,()=>{

   
    Logining.info("connected to port 8080")


})


try {
    mongoose.connect(`mongodb+srv://${process.env.DATABASE_USER_NAME}:${process.env.DATABASE_PASSWORD}@chatdatabase.fnneyaw.mongodb.net/
    `,{retryWrites:true,w:'majority'}).then((val)=>{
        Logining.info('connected to mongo database '+val.connect.name)
    })
    mongoose.set('strictQuery',false)
} catch (error) {
 Logining.error('faild to connect to mongo database'+error)   
}