import axios from "axios";

const axiosInestance = axios.create({
    baseURL:"http://192.168.1.4:8080/",
    withCredentials:true
})
//"https://ayno-chat-api.onrender.com
//https://ayno-chat-api.onrender.com

// const axiosUserInestance = axios.create({
//     baseURL:"http://192.168.1.4:8080/user",
//     withCredentials:true
// })

const userInstance = axios.create({
    baseURL:"http://192.168.1.4:8080/user",
    withCredentials:true
})







export  {axiosInestance,userInstance}