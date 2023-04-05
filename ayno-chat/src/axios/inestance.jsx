import axios from "axios";

const axiosInestance = axios.create({
    baseURL:"https://ayno-chat-api.onrender.com/",
    withCredentials:true
})
//"https://ayno-chat-api.onrender.com



const userInstance = axios.create({
    baseURL:"https://ayno-chat-api.onrender.com/user",
    withCredentials:true
})







export  {axiosInestance,userInstance}